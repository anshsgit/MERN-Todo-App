function Home() {
    return <div style={{marginTop: '50px'}}>
        <div className='heading container' style={{display: 'flex', justifyContent: 'center', marginTop: '25px'}}>
            <h2>Welcome</h2>
        </div>

        <p>This project contains a todo application which have the following features:</p>

        <ul>
            <li>
            This is a simple application which let you signup/signin.
            </li>
            <li>
            Create todos, update todos and delete todos.
            </li>
            <li>
            And all your data will get stored in the mongoDB database.
            </li>
            <li>
                Login/Signup to start.
            </li>
        </ul>

    </div>
}

export default Home;