import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import { GlobalContext } from '../context/GlobalContext';
import '../App.css';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const history = useHistory();

    const emptyInputField = () => {
        setName('');
        setEmail('');
        setPassword('');
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/register', {
            "email": email,
            "password": password,
            "name": name
        })
            .then(res => {
                alert('Sign up success.'); 
                history.push('/login');
                emptyInputField();
            })
            .catch(err => alert(err))
    }

    return (
        <form className="signup-form-container" onSubmit={handleSubmit} method="POST">
            <h1>Sign Up Form</h1>
            <div className="input-container">
                <TextField type="text" label="NAME" InputLabelProps={{ shrink: true }}
                    name="name" value={name} onChange={handleChange} required />
            </div>
            <div className="input-container">
                <TextField type="email" label="EMAIL" InputLabelProps={{ shrink: true }}
                    name="email" value={email} onChange={handleChange} required />
            </div>
            <div className="input-container">
                <TextField type="password" label="PASSWORD" InputLabelProps={{ shrink: true }}
                    name="password" value={password} onChange={handleChange} required />
            </div>
            <div><span className="err-msg">{errMsg}</span></div>
            <button>Sign Up</button>
        </form>
    )
}

export default SignUpPage
