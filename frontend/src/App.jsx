
import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Todos from './components/Todos/Todos';
import PostTodo from './components/PostTodo/PostTodo';
import Error from './components/Error/Error';
import ContextProvider, { TodoContext } from './Context/Context';
import './App.css'


function App() {

  return (
    <ContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />

        <Route path='/login' element={<Login/>}/>

        <Route path='/signup' element={<Signup/>} />

        <Route path='/todos' element={<Todos/>} >

          <Route path='post' element={<PostTodo/>}/>

        </Route>

        <Route path='/error' element={<Error/>} />

      </Route>
    </Routes>
  </BrowserRouter>
  </ContextProvider>
  )
}

export default App;