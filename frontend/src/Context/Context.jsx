import { createContext, useState, useEffect } from 'react';
import App from '../App.jsx';
import axios from 'axios';

export const TodoContext = createContext();

export default function ContextProvider({children}) {
    const [todos, setTodos] = useState([]);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');


    function clearTodos() {
        setTodos([]);
    };
  
    useEffect(() => {
        if(!token) {
        clearTodos();
        }
    }, [token]);
  
    function errorResponse(error) {
        setError(err => error.message);
        navigate('/error');

    }

    function create(todo) {
        console.log('Token: ', token);
        axios({
            method: 'post',
            url: 'http://localhost:3000/todos',
            data: {
                title: todo.title,
                description: todo.description
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(postResponse)
        .catch(errorResponse);

        function postResponse(res) {
            axios({
                method: 'get',
                url: 'http://localhost:3000/todos',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(getResponse)
            .catch(errorResponse);
        }

        function getResponse(res) {
            setTodos((todos) => {
                return res.data.todos.map((todo) => {
                    const { _id, userId, title, description, done, createdAt } = todo;
                    return {
                        _id: _id.toString(),
                        userId: userId.toString(),
                        title,
                        description,
                        done,
                        createdAt
                    }
                })
                
            });
            
        }
    }

    function update(id, todo) {

        axios({
            method: 'put',
            url: `http://localhost:3000/todos/${id}`,
            data: {
                title: todo.title,
                description: todo.description
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(getResponse)
        .catch(errorResponse);

        function getResponse(res) {
            setTodos((todos) => {
                return todos.filter((todo1) => {
                    if(todo1._id === id) {
                        todo1.title = todo.title,
                        todo1.description = todo.description
                    }
                    return todo1;
                })
            });
        }
    }
 
    function remove(id) {
        axios({
            method: 'delete',
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(getResponse)
        .catch(errorResponse);

        function getResponse(res) {
        console.log('Id in remove: ', id);
        setTodos((todos) => {
            return todos.filter((todo) => {
                return todo._id !== id;
            })
        });
    }

        
    }

    function toggleComplete(id) {

        axios({
            method: 'put',
            url: `http://localhost:3000/todoDone/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(getResponse)
        .catch(errorResponse);

        function getResponse(res) {
            setTodos((todos) => {
                return todos.filter((todo) => {
                    if(todo._id === id) {
                        todo.done = !todo.done
                    }
                    return todo;
                })
            });
        }

    }

    return <TodoContext.Provider value={
        {todos, setTodos, token, setToken, error, setError, create, update, remove, toggleComplete, clearTodos }
    }>
        {children}
    </TodoContext.Provider>
}