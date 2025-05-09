import {useState, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './Todos.module.css';

function Todos({todos, token, setTodos, setError}) {
    debugger
    const navigate = useNavigate();
    console.log(todos)

    function deleteTodo(id) {
        axios({
            method: 'delete',
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            debugger
            setTodos(todos => todos.filter((todo) => {
                return todo._id.toString() !== id
            }))
        })
        .catch((error) => {
            console.log(error);
            setError(err => error.message);
            navigate('/error');
        });
    }


    useEffect(() => {
        navigate('/todos/post')
    }, []);

    return <div className={styles.todosContainer}>
        {todos.map((todo, index) => {
            console.log(todo, index);
            return <div key={index} className={styles.todoContainer}>
                <div>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
                </div>
                <button onClick={() => deleteTodo(todo._id.toString())} className={styles.deleteButton}>Delete</button>
            </div>
        })}
        <Outlet />
    </div>
}

export default Todos;