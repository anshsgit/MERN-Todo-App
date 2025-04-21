import {useState, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';

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

    return <div style={{display: 'flex', flexDirection: 'column', marginTop: '50px'}}>
        {todos.map((todo, index) => {
            console.log(todo, index);
            return <div key={index} style={{border: '1px solid black', borderRadius: '5px', backgroundColor: '#F9CFD3', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '10px 20px 10px 20px'}}>
                <div>
                <p style={{marginTop: '0px'}}>{todo.title}</p>
                <p style={{marginTop: '0px'}}>{todo.description}</p>
                </div>
                <div></div>
                <button onClick={() => deleteTodo(todo._id.toString())} style={{alignSelf: 'center'}}>Delete</button>
            </div>
        })}
        <Outlet />
    </div>
}

export default Todos;