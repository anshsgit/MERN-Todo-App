const mongoose = require('mongoose');

async function mongodb() {
try{
    await mongoose.connect('mongodb+srv://guptaanshofficial:anshDasna@cluster0.ny98p.mongodb.net/Todo-App');

    } catch(error) {
    console.error("Error in connecting to DB: " +error);
}
}
mongodb()

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 8}
});    
const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: User},
    title: String,
    description: String,
    done: Boolean,
    createdAt: String,
    doneBy: String

});
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {User, Todo};