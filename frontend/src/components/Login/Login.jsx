import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { TodoContext } from '../../Context/Context'

function Login() {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const {setTodos, setToken, setError} = useContext(TodoContext);

    const navigate = useNavigate();
    const signup = <p style={{fontSize: '18px'}}>New user? Sign up</p>;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser((user) => {
            return {...user, [name]: value};
        })
    }

    function submit(event) {
        event.preventDefault();
        const {username, password} = user;
        console.log('User: ', user);
        console.log('Password: ', password);
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
            console.log('Token in Login: ', res.data.token);
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
            navigate('/todos')
        }
    }

    function errorResponse(error) {
        console.log(error);
        setError(err => error.message);
        navigate('/error');
    }

    return <div className={styles.loginContainer}>
        <h2>Login Form</h2>

            <form onSubmit={submit}>
            <input name='username' type='text' id='username' placeholder='Enter username' onChange={handleChange} />
        
            <input name='password' type='text' id='password' placeholder='Enter password' onChange={handleChange} />
        
            <input type='submit' value='Login' style={{marginTop: '10px'}}/>
            </form>

        <NavLink to='/signup'>{signup}</NavLink>
    </div>
}

export default Login;