import React, { useState, useEffect, useContext } from 'react';
import InputField from './InputField';
import TodoList from './TodoList';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';

const Todo = () => {
    const { token, setIsLogin } = useContext(GlobalContext);
    const [isLoading, setLoading] = useState(true);
    const [todo, setTodo] = useState([]);
    const getDataUser = JSON.parse(localStorage.getItem('dataUser'));

    const history = useHistory();

    useEffect(() => {
        console.log('useEffect: ', isLoading);

        setIsLogin(true)
        getTodos();
    }, [isLoading])

    const getTodos = () => {
        axios.get('http://127.0.0.1:8000/todos/', {
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
                localStorage.clear();
                history.push('/login');
            }
        })
    }

    if(!localStorage.getItem('token')) {
        setIsLogin(false)
        return <Redirect to="/login"/>
    }
    return (
        <div className="todo">
            <h1>{`${getDataUser.name}'s To-do List`}</h1>
            <InputField isLoading={isLoading} setLoading={setLoading} />
            <TodoList setLoading={setLoading} todo={todo} setTodo={setTodo} />
        </div>
    )
}

export default Todo
