import React, { useState, useEffect, useContext } from 'react';
import InputField from './InputField';
import TodoList from './TodoList';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';

const Todo = () => {
    const { token, setIsLogin, logout } = useContext(GlobalContext);
    const [isLoading, setLoading] = useState(true);
    const [todo, setTodo] = useState([]);

    const history = useHistory();

    useEffect(() => {
        setIsLogin(true)
        getTodos();
    }, [isLoading])

    const getTodos = () => {
        axios.get('http://6f8e-103-92-225-75.ap.ngrok.io/todos/', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(res => {
            setTodo(res.data.data)
            setLoading(false)
            if (localStorage.getItem('token')) {
                setIsLogin(true)
            }
        }).catch(err => {
            alert(err.response.data.message)
            if (err.response.status === 401) {
                logout(history);
            }
        })
    }

    return (
        <div className="todo">
            <h1>To-do List</h1>
            <InputField isLoading={isLoading} setLoading={setLoading} />
            <TodoList setLoading={setLoading} todo={todo} setTodo={setTodo} />
        </div>
    )
}

export default Todo
