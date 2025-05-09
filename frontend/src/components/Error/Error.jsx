import styles from './Error.module.css';

const Error = ({error}) => {

    return <div className={styles.errorContainer}>
    <div>{error} :Kindly try again.</div>
    </div>
}

export default Error;