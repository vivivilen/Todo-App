import React from 'react'
import { useHistory } from 'react-router-dom'
import emptyPic from '../img/empty.png'

const EmptyCart = () => {
const history = useHistory();

    return (
        <div style={{textAlign: 'center'}}>
            <img src='empty-pic' src={emptyPic} width='450' text-align='center'></img>
            <h2>Your cart is empty</h2>
            <button className="btn-go-shop" onClick={() => history.push('/shop')}>Go to Shop</button>
        </div>
    )
}

export default EmptyCart
