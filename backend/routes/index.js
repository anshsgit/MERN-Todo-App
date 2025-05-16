const {User, Todo} = require('../db/index');
const {userAuthorization, passkey} = require('../authentication/index');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Router } = require('express');
const route = Router();
const bcrypt = require('bcrypt');
const {z} = require("zod");

route.post('/signup', async (req, res) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
        const requiredBody = z.object({
            fullname: z.string().min(3).max(50),
            username: z.string().max(50).email().toLowerCase(),
            password: z.string().min(8,{message: "Must be 8 char long."}).max(50).regex(specialCharRegex, {message: "password must contain one special case character."}).regex(upperCaseRegex, {message: "password must contain one upper case character."}).regex(lowerCaseRegex, {message: "password must contain one lower case character."})
        });
        const parsedData = requiredBody.safeParse(req.body);
        console.log(parsedData);

        if(!parsedData.success){

            return res.status(400).json({
                message: "Incorrect format.",
                error: parsedData.error
            })
        } else {

            const {fullname, username, password} = parsedData.data;
            try{
                const hash = await bcrypt.hash(password, 5);
                await User.create({
                    fullname,
                    username,
                    password: hash
                });
                const user = await User.findOne({username});
                const token = jwt.sign({_id: user._id.toString()}, passkey);
                res.status(200).json({token});
            } catch(error) {
                console.error("Error in creating the user: " +error);
                res.status(500).json({message: error.message})
            }
        
    
        }
        
});

route.post('/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(password);
    try{
        const user = await User.findOne({username: username.toLowerCase()});
        console.log('user: ', user);
        const hash = user.password;

        console.log('hash: ', hash);
        const result = await bcrypt.compare(password, hash);
        console.log("req.body ",result)

        if(result) {
            const token = jwt.sign({_id: user._id.toString()}, passkey, {expiresIn: '1h'});
            res.status(200).json({token});
        } else {
            res.status(400).json({message: "Bad request."})
        }
    } catch(error) {
        res.status(500).json({error: error.message})
        console.error(`Error in authorizing the user: ${error}`);
    }
})

route.get('/todos', userAuthorization, async (req, res) => {
    try{
        const user = await User.findOne({_id: req.id});
        const todos = await Todo.find({userId: user._id});
        res.status(200).json({todos})
    } catch(error) {
        console.error(`Error in retreiving the todos: ${error}`);
        res.status(500).json({message: "Error in retreiving the todos."});
    }
    
});

route.get('/todos/:id', userAuthorization, async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findOne({_id: id});
    res.status(200).json({todo});
});

route.post('/todos', userAuthorization, async (req, res) => {
    const {title, description} = req.body;
    const date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}`
    try{
        const user = await User.findOne({_id: req.id});
        console.log(user);
        await Todo.create({
            userId: user._id,
            title,
            description,
            done: false,
            createdAt: currentTime
        });
        res.status(200).json({message: "Todo saved successfully."});

    } catch(error) {
        console.error(`Error in storing todos: ${error}`);
        res.status(500).json({message: "Error in storing todos."});
    }
    
})

route.put('/todos/:id', userAuthorization, async (req, res) => {
    const id = req.params.id;
    const {title, description} = req.body;
    const date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}`
    try{
        const todo = await Todo.findOne({_id:id});
    todo.title = title;
    todo.description = description;
    todo.createdAt = currentTime;
    await todo.save();
    res.status(200).json({message: "Todo updated successfully."});
    } catch(error) {
        console.error(`Error in updating the todo: ${error}`);
        res.status(500).json({message: "Error in updating the todo."});
    }
    
})

route.put('/todoDone/:id', userAuthorization, async (req, res) => {
    const id = req.params.id;
    try{
        const todo = await Todo.findOne({_id:id});
        todo.done = !todo.done;
        await todo.save();
        res.status(200).json({message: "Todo completed."});
    } catch(error) {
        console.error(`Error in marking the todo: ${error}`);
        res.status(500).json({message: "Error in marking the todo."});

    }
})

route.delete('/todos/:id', userAuthorization, async (req, res) => {
    const id = req.params.id;
    try {
        await Todo.deleteOne({_id:id});
        res.status(200).json({message: "Todo deleted successfully."});
    } catch(error) {
        console.error("Error in deleting the todo: " +error);
        res.status(500).json({message: "Error in deleting the todo."});
    }
    
}) 

route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
})

route.use((req, res) => {
    res.status(200).json({message: "Not a valid route."});
})

module.exports = route;
