import React, { useContext, useState } from 'react'
import '../App.css';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';

export const InputField = (props) => {
    const { token } = useContext(GlobalContext);
    const [title, setTitle] = useState('');
    const { setLoading } = props

    const handleChange = e => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://127.0.0.1:8000/todos/';

        setLoading(true)
        axios.post(url, {
            title: title,
            description: 'todo list'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(res => {
            console.log(res);
            setLoading(false);
            // if (todo === null) {
            //     window.location.reload();
            // }
        }   ).catch(err => alert(err))
        setTitle('');
    }

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <input type="text" className="input-box" placeholder="Your to-do list"
                value={title} name="title" onChange={handleChange} />
            <button className="btn-add">Add todo</button>
        </form>
    )
}
export default InputField;