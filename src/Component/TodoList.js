import React, { useContext } from 'react';
import '../App.css';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { GlobalContext } from '../Context/GlobalContext';

export const TodoList = (props) => {
    const token = useContext(GlobalContext);
    const { setLoading, todo } = props;

    const deleteRequest = (id) => {
        setLoading(true)
        axios.delete(`http://127.0.0.1:8000/todos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .catch(err => { console.log(err) })
            .then(response => {
                setLoading(false);
                console.log(response)
            })
    }

    const handleChange = (index, e) => {
        // const findIndex = todo.findIndex(i => i.todo_id === index);
        const { checked } = e.target

        setLoading(true);
        axios.patch(`http://127.0.0.1:8000/todos/${index}`, {
            is_completed: checked
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(response => {
            setLoading(false)
            console.log('response: ', response)
        }).catch(err => console.log(err))
    }

    return (
        todo !== null ?
            <div className="todo-list-container">
                {todo.map(i => (
                    <ul className="todo-list" key={i.todo_id}>
                        <input type="checkbox" className="check-box"
                            onChange={(e) => handleChange(i.todo_id, e)} checked={i.is_completed} />
                        <li className={i.is_completed === true ? "checked-box-list" : ""} onClick={() => console.log(i.is_completed)}>{i.title}</li>
                        <span><DeleteOutlined style={{ fontSize: '20px' }} onClick={() => deleteRequest(i.todo_id)} /></span>
                    </ul>
                ))}
            </div> : <div className="no-data">No to-do list at the moment</div>
    )
}

export default TodoList;