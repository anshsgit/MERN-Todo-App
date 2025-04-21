import {Outlet, NavLink} from 'react-router-dom';
import {useRef} from 'react';

const Layout = () => {

    return <div style={{}}>
        <header style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#E884BA', padding: '20px', borderRadius: '15px 0px 0px 0px'}}>
            <h2>Todo App</h2>
            <NavLink style={{alignSelf: 'center', textDecoration: 'none', backgroundColor: 'white', padding: '10px 20px 10px 20px', borderRadius: '10px'}} to='/login'>Login</NavLink>
        </header>
        
        <Outlet style={{marginTop: '50px'}}/>

    </div>
}

export default Layout;