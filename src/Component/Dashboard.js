import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';

const Dashboard = () => {
    const { isLogin, setIsLogin } = useContext(GlobalContext);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsLogin(false)
            return <Redirect to="/login" />
        } else { 
            setIsLogin(true)
        };
    }, []);


    console.log(isLogin)
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard
