import {useState, useEffect, useContext} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import styles from './Todos.module.css';
import { TodoContext } from '../../Context/Context';
import Todo from '../Todo/Todo';

function Todos() {
    const { todos } = useContext(TodoContext);
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/todos/post')
    }, []);

    return <ul className={styles.todosContainer}>
        {todos.map((todo) => {
            console.log(todo);
            return <Todo
                    todo={todo}
                    key={todo._id}
                    />
        })}
        <Outlet />
    </ul>
}

export default Todos;