import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [dataUser, setDataUser] = useState({});
    const [isLogin, setIsLogin] = useState(!localStorage.getItem('token') ? false : true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [qty, setQty] = useState(0);

    const logout = (history) => {
        setIsLogin(false);
        localStorage.clear();
        setQty(0);
        history.push('/login');
      }

    return (
        <GlobalContext.Provider value={{ dataUser, setDataUser, token, setToken, isLogin, setIsLogin, logout, qty, setQty }}>
            {props.children}
        </GlobalContext.Provider>
    )
}