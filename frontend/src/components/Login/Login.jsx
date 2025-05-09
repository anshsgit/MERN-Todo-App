import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import styles from './Login.module.css';

function Login({setTodos, setToken, setError}) {
    const navigate = useNavigate();
    const signup = <p style={{fontSize: '18px'}}>New user? Sign up</p>;
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function onPress() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log("password",password)
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                username,
                password
            }
        })
        .then(loginResponse)
        .catch(errorResponse);
    }

    function loginResponse(res) {
        if(res.status === 200) {
            setToken(token => res.data.token);

            axios({
            method: 'get',
            url: 'http://localhost:3000/todos',
            headers: {
                'Authorization': `Bearer ${res.data.token}`
            }
            })
            .then(getReponse)
            .catch(errorResponse);
        }
        
    }

    function getReponse(res) {
        if(res.status === 200) {
            console.log(res.data.todos);
            setTodos(todos => res.data.todos);
            navigate('/todos')
        }
    }

    function errorResponse(error) {
        console.log(error);
        setError(err => error.message);
        navigate('/error');
    }

    return <div className={styles.loginContainer}>
        <h3>Login Form</h3>

            <input type='text' id='username' placeholder='Enter username' ref={usernameRef} />
        
            <input type='text' id='password' placeholder='Enter password' ref={passwordRef} />
        
            <input type='button' value='Login' onClick={onPress} style={{marginTop: '10px'}}/>

        <NavLink to='/signup'>{signup}</NavLink>
    </div>
}

export default Login;