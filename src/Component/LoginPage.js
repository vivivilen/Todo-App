import React, { useState, useContext } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';

const LoginPage = () => {
    const { setToken, setDataUser, setIsLogin } = useContext(GlobalContext);
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/auth/login', {
            email: email,
            password: password
        }).then(res => {
            setIsLogin(true);
            alert('Login success!');
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('dataUser', JSON.stringify(res.data.data.user));
            setToken(res.data.data.token);
            setDataUser(res.data.data.user);
            history.push('/');
        })
        .catch(err => {
            alert('Invalid email or password.')
        });
    }

    // const checkDataLogin = () => {
    //     let flag = false;

    //     let findData = signUpData.filter(data => ((data.email === email) && (data.password === password)))

    //     if (findData.length > 0) {
    //         sessionStorage.setItem('dataLogin', JSON.stringify(findData[0]));
    //         setLoginData(findData[0]);
    //         flag = true;
    //     }
    //     return flag;
    // }

    if (localStorage.getItem('token')) {
        return <Redirect to="/todo"/>
    }

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <h1>Login Form</h1>

            <div className="input-container">
                <TextField type="email" label="EMAIL" InputLabelProps={{ shrink: true }}
                    onChange={handleChange} name="email" value={email} required />
            </div>

            <div className="input-container">
                <TextField type="password" label="PASSWORD" InputLabelProps={{ shrink: true }}
                    onChange={handleChange} name="password" value={password} required />
            </div>
            <button>LOGIN</button>
        </form>
    )
}

export default LoginPage
