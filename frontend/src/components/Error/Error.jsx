import styles from './Error.module.css';
import { useContext } from 'react';
import { TodoContext } from '../../Context/Context'

const Error = () => {
    const { error } = useContext(TodoContext);

    return <div className={styles.errorContainer}>
    <div>{error} :Kindly try again.</div>
    </div>
}

export default Error;