import React, { useEffect } from 'react'
import '../App.css';
import axios from 'axios';

export const InputField = (props) => {
    useEffect(() => {
        // console.log('This is useEffect');
    }, [props.todo])

    const handleChange = e => {
        props.setTodo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/todos';

        axios.post(url, {
            title: props.todo,
            description: 'for testing purpose',
        }).catch(err => console.log(err))
            .then(response => {
                props.data === null ? window.location.reload() : console.log('input: ', response)
            })
        props.setTodo('');
    }

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <input type="text" className="input-box" placeholder="Your to-do list" value={props.todo} onChange={handleChange} />
            <button className="btn-add">Add todo</button>
        </form>
    )
}
