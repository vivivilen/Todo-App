import React, { createContext, useState } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [todo, setTodo] = useState([]);
    const [dataUser, setDataUser] = useState({});
    const [token, setToken] = useState('');

    const getTodos = () => {
        axios.get('http://127.0.0.1:8000/todos/', {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `${token}`}
        })
        .then(res => console.log(res))
        .catch(err => console.log('error: ', err))
    }

    return (
        <GlobalContext.Provider value={{ todo, setTodo, dataUser, setDataUser, getTodos, token, setToken }}>
            {props.children}
        </GlobalContext.Provider>
    )
}