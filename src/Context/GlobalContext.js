import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [dataUser, setDataUser] = useState({});
    const [isLogin, setIsLogin] = useState(!localStorage.getItem('token') ? false : true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <GlobalContext.Provider value={{ dataUser, setDataUser, token, setToken, isLogin, setIsLogin }}>
            {props.children}
        </GlobalContext.Provider>
    )
}