import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../Context/GlobalContext';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const Shop = () => {
    const {token, setIsLogin} = useContext(GlobalContext);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/shop', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(res => {
            if(res.status === 401) {
                return <Redirect to='/login'/>
            }
        })
    })

    token && setIsLogin(true);

    return (
        <div className="shop-container">
            <div className="shop-item">
                
            </div>
        </div>
    )
}

export default Shop
