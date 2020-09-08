import React, { useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

export const TodoList = (props) => {
    useEffect(() => {
        props.getRequest()
    }, [props.data])

    const deleteRequest = (id) => {
        axios.delete(`http://localhost:8000/todos/${id}`)
            .catch(err => console.log(err))
            .then(response => console.log(response))
    }

    const handleChange = (index) => {
        // setIsCheck(!index.is_completed)
        let updateCheck = !index.is_completed
        console.log('api_completed: ', index.is_completed);

        axios.patch(`http://localhost:8000/todos/${index.Id}`, {
            title: index.title,
            description: index.description,
            is_completed: updateCheck
        }).catch(err => console.log(err))
            .then(response => {
                // console.log(response.data.data)
                console.log(response)
            })
    }

    return (
        // console.log(data),
        props.data !== null ? 
            <div className="todo-list-container">
                {props.data.map(i => (
                    <ul className="todo-list" key={i.Id}>
                        <input type="checkbox" className="check-box"
                            onChange={() => handleChange(i)} checked={i.is_completed} />
                        <li className={i.is_completed === true ? "checked-box-list" : ""} onClick={()=>console.log(i.is_completed)}>{i.title}</li>
                        <span><DeleteOutlined style={{ fontSize: '20px' }} onClick={() => deleteRequest(i.Id)} /></span>
                    </ul>
                ))}
            </div> : <div className="no-data">No to-do list at the moment</div>
    )
}