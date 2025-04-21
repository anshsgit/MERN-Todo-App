import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const PostTodo = ({setTodos, token, setError}) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const donebyRef = useRef();
    const navigate = useNavigate();

    function onPress() {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const doneBy = donebyRef.current.value;

        axios({
            method: 'post',
            url: 'http://localhost:3000/todos',
            data: {
                title,
                description,
                doneBy
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(postResponse);
    }

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
        setTodos(todos => res.data.todos);
        
    }

    function errorResponse(error) {
        setError(err => error.message);
        navigate('/error');

    }

    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', border: '1px solid black', marginTop: '50px'}}>
        <h3 style={{margin: '0px 0px 10px 0px'}}>Add todos</h3>

        <input id='title' type='text' placeholder='Enter title' ref={titleRef}/>

        <input id='description' type='text' placeholder='Enter description' ref={descriptionRef}/>
        
        <input id='doneby' type='text' placeholder='Enter time' ref={donebyRef}/>

        <button onClick={onPress} style={{marginTop: '10px'}}>Add todo</button>
        
    </div>
}

export default PostTodo;