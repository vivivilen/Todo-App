import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';

const Dashboard = () => {
    const { token, isLogin } = useContext(GlobalContext);

    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }

    // const getDashboard = () => {
    //     axios.get('http://127.0.0.1:8000/', {
    //         headers: {
    //             'Context-Type': 'application/json',
    //             'Authorization': `${token}`
    //         }
    //     }).then(res => console.log(res))
    // }

    // useEffect(() => {
    //     getDashboard();
    // })

    console.log(isLogin)
    return (
        <div>
            <h1>Hi !</h1>
        </div>
    )
}

export default Dashboard
