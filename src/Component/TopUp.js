import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';

const TopUp = () => {
    const [topUpValue, setTopUpValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token, logout } = useContext(GlobalContext);

    const history = useHistory();

    const handleChange = (e) => {
        if (e.target.name === "topUp") {
            setTopUpValue(Number(e.target.value))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        axios.post('http://127.0.0.1:8000/user/topup', {
            "balance": topUpValue
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                let user = JSON.parse(localStorage.getItem('dataUser'));

                user.wallet = res.data.data.balance;
                localStorage.setItem('dataUser', JSON.stringify(user));
                setIsLoading(false);
                alert('Top up success!');
                setTopUpValue("");
            }
        }).catch(err => {
            alert(err.response.data.message)
            if(err.response.status === 401) {
                logout(history)
            }
            console.log('error:', err.response)})
    }
    return (
        <form className="topup-form-container" onSubmit={handleSubmit}>
            <h4 className="balance-label">Current Balance</h4>
            <p className="curr-balance">Rp {JSON.parse(localStorage.getItem('dataUser')).wallet}</p>

            <div className="edit-field-container">
                <label htmlFor="top-up" className="topup-label">How much would you like to top up?</label> <br />
                <input type="number" min="0" name="topUp" value={topUpValue} onChange={handleChange} required />
            </div>
            <button>Proceed</button>
        </form>
    )
}

export default TopUp
