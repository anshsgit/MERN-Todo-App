import {useState, useEffect, useRef, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import styles from './Signup.module.css';
import { TodoContext } from '../../Context/Context';

function Signup() {
    const {setToken, setError, clearTodos} = useContext(TodoContext);
    const [user, setUser] = useState({
        fullname: '',
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser((user) => {
            return {...user, [name]: value};
        });
    }

    function submit(event) {
        event.preventDefault();
        clearTodos();
        const {fullname, username, password} = user;
        console.log(user);
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
    <h2>Signup Form</h2>
    
    <form className={styles.formContainer} onSubmit={submit}>
        <input name='fullname' type='text' id='fullname' placeholder='Enter fullname' onChange={handleChange}/>
    
        <input name='username' type='text' id='username' placeholder='Enter username' onChange={handleChange}/>
    
        <input name='password' type='text' id='password' placeholder='Enter password' onChange={handleChange}/>
    
        <input type='submit' value='Sign up' className={styles.signupButton}/>
    </form>
</div>
}

export default Signup;
