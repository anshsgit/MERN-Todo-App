import styles from './Todo.module.css';
import { useState, useContext } from 'react';
import { TodoContext } from '../../Context/Context';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";

export default function Todo({todo, key}) {
    console.log('Id in Todo: ', todo._id);
    const {update, remove, toggleComplete} = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({
        title: '',
        description: ''
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setUpdatedTodo((todo) => {
            return {...todo, [name]: value};
        })
    }

    function submit(event) {
        event.preventDefault();
        setIsEditing(edit => !edit);
        update(todo._id, updatedTodo);
    }

    const result = isEditing?
    <form onSubmit={submit}>
        <input name='title' id='title' type='text' placeholder='Enter title' onChange={handleChange} />
        <input name='description' id='description' type='text' placeholder='Enter description' onChange={handleChange} />
        <input type='submit' value='submit' />
    </form>
    :
    <li className={styles.todoContainer}>
        <div className={todo.done? styles.completeButton : ''} onClick={() => { toggleComplete(todo._id) }}>
            <h3 className={styles.title}>{todo.title}</h3>
            <p>{todo.description}</p>
        </div>
        <div className={styles.buttonContainer}>
            <button onClick={() => { setIsEditing(edit => !edit) }}> <GoPencil /> </button>
            <button onClick={() => { remove(todo._id) }}> <RiDeleteBin6Line /> </button>
        </div>
    </li>;

    return result;
}