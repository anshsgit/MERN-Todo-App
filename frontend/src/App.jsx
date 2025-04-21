import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from "axios";
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Todos from './components/Todos';
import PostTodo from './components/PostTodo';
import Error from './components/Error';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  debugger
function clearTodos() {
  setTodos([]);
}

useEffect(() => {
  if(!token) {
    clearTodos();
  }
}, [token])

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/login' element={<Login setTodos={setTodos} setToken={setToken} setError={setError}   style={{marginTop: '50px'}}/>}/>
        <Route path='/signup' element={<Signup setTodos={setTodos} setToken={setToken} setError={setError} clearTodos={clearTodos}/>} />
        <Route path='/todos' element={<Todos todos={todos} setTodos={setTodos} token={token} setError={setError} />} >
          <Route path='post' element={<PostTodo setTodos={setTodos} token={token}  setError={setError} />}/>
        </Route>
        <Route path='/error' element={<Error error={error} />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;