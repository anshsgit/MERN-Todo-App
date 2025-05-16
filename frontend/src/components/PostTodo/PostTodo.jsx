import {useState, useRef, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './PostTodo.module.css';
import { TodoContext } from '../../Context/Context'


const PostTodo = () => {
    const {create} = useContext(TodoContext);

    const [todo, setTodo] = useState({
        title: '',
        description: ''
    });
    const navigate = useNavigate();

    function  handleChange(event) {
        const {name, value} = event.target;
        setTodo((todo) => {
            return {...todo, [name]: value}});
    }

    function submit(event) {
        event.preventDefault();
        create(todo);
    }


    return <div className={styles.postContainer}>
        <h2>Add todos</h2>

        <form onSubmit={submit}>
        <input name='title' id='title' type='text' placeholder='Enter title' onChange={handleChange}/>
        <input name='description' id='description' type='text' placeholder='Enter description' onChange={handleChange}/>

        <input className={styles.addButton} type='submit' value='Add todo' />
        </form>

    </div>
}

export default PostTodo;