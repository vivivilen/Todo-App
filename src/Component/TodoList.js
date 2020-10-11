import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import {GlobalContext} from '../Context/GlobalContext';

export const TodoList = () => {
    const [isCheck, setIsCheck] = useState(Boolean);
    const { token, setIsLogin } = useContext(GlobalContext);
    const [todo, setTodo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        getTodos();
    }, [isLoading])
    
    const getTodos = () => {
        axios.get('http://127.0.0.1:8000/todos/', {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `${token}`}
        }).then(res => {
            setTodo(res.data.data)
            setLoading(false)
            if(localStorage.getItem('token')) {
                setIsLogin(true)
            }
        }).catch(err => {
            alert(err.response.data.message);
            history.push('/login');
        })
    }

    const deleteRequest = (id) => {
        axios.delete(`http://127.0.0.1:8000/todos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .catch(err => {console.log(err)})
            .then(response => {
                setLoading(true);
                console.log(response)})
    }

    const handleChange = (index) => {
        // setIsCheck(!index.is_completed)
        // let updateCheck = !index.is_completed
        setIsCheck(prevIsCheck => !prevIsCheck)

        console.log('api_completed: ', index.is_completed);

        axios.patch(`http://127.0.0.1:8000/todos/${index.Id}`, {
            title: index.title,
            description: index.description,
            is_completed: isCheck
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).catch(err => console.log(err))
            .then(response => {
                // console.log(response.data.data)
                console.log(response)
            })
    }

    return (
        todo !== null ? 
            <div className="todo-list-container">
                {todo.map(i => (
                    <ul className="todo-list" key={i.todo_id}>
                        <input type="checkbox" className="check-box"
                            onChange={() => handleChange(i)} checked={i.is_completed} />
                        <li className={i.is_completed === true ? "checked-box-list" : ""} onClick={()=>console.log(i.is_completed)}>{i.title}</li>
                        <span><DeleteOutlined style={{ fontSize: '20px' }} onClick={() => deleteRequest(i.todo_id)} /></span>
                    </ul>
                ))}
            </div> : <div className="no-data">No to-do list at the moment</div>
    )
}

export default TodoList;