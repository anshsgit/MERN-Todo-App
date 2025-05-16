import {Outlet, NavLink} from 'react-router-dom';
import styles from './Layout.module.css';

import {useRef} from 'react';

const Layout = () => {

    return <div className={styles.layoutContainer}>
        <header>
            <h1>Todo App</h1>
            <NavLink className={styles.navLink} to='/login'>Login</NavLink>
        </header>

        <main className={styles.outlet}>
            <Outlet />
        </main>

    </div>
}

export default Layout;