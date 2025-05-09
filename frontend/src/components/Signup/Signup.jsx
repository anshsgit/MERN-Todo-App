import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import styles from './Signup.module.css';

function Signup({setToken, setError, clearTodos}) {

    const fullnameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    function onPress() {
        clearTodos();
        const fullname = fullnameRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        console.log(fullname, username, password);
        axios({
            method: 'post',
            url: 'http://localhost:3000/signup',
            data: {
                fullname,
                username,
                password
            }
        })
        .then(postResponse)
        .catch(errorResponse);
    }
    
    function postResponse(res) {
        console.log(res.data);
        setToken(token => res.data.token);
        navigate('/todos/post');
    }

    function errorResponse(error) {
        setError(err => error.message);
        navigate('/error');
    }

    return <div className={styles.signupContainer}>
    <h3>Signup Form</h3>
    
        <input type='text' id='name' placeholder='Enter fullname' ref={fullnameRef}/>
    
        <input type='text' id='username' placeholder='Enter username' ref={usernameRef}/>
    
        <input type='text' id='password' placeholder='Enter password' ref={passwordRef}/>
    
        <input type='button' value='Sign up' onClick={onPress}  className={styles.signupButton}/>
    
</div>
}

export default Signup;
