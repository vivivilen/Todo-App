import React, { useEffect, useContext } from 'react'
import '../App.css';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';

export const InputField = () => {
    const { todo, setTodo, data, setData, token } = useContext(GlobalContext);

    useEffect(() => {
        // console.log('This is useEffect');
        console.log(token)
    }, [todo])

    const handleChange = e => {
        setTodo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://127.0.0.1:8000/todos/';

        // axios.post(url, {
        //     title: todo,
        //     description: 'for testing purpose',
        // }).catch(err => console.log(err))
        //     .then(response => {
        //         data === null ? window.location.reload() : console.log('input: ', response)
        //     })
        // setTodo('');

        axios.post(url, {
            title: todo,
            description: 'For testing purpose'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(res => console.log(res))
    }

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <input type="text" className="input-box" placeholder="Your to-do list" value={todo} onChange={handleChange} />
            <button className="btn-add">Add todo</button>
        </form>
    )
}
export default InputField;