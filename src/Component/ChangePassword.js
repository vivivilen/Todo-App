import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';

const ChangePassword = () => {
    const { token } = useContext(GlobalContext);
    const [currPass, setCurrPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confPass, setConfpass] = useState('');

    const history = useHistory();

    const handleChange = (e) => {
        if (e.target.name === "currentPassword") {
            setCurrPass(e.target.value);
        } else if (e.target.name === "newPassword") {
            setNewPass(e.target.value)
        } else {
            setConfpass(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPass !== confPass) {
            alert('Password is incorrect. Please try again');
        } else {
            axios.put('http://6c5e-103-92-225-75.ap.ngrok.io/user/me/update-password', {
                old_password: currPass,
                new_password: newPass,
                confirm_password: confPass
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    alert("Change password success!");
                    localStorage.clear();
                    history.push('/login');
                    console.log('success')
                }
            })
                .catch(err => alert(err.response.data.message))
        }
    }

    return (
        <div className="change-password-container">
            <div className="change-password-item">
                <form className="form-change-password" onSubmit={handleSubmit}>
                    <h4>Change your password</h4>

                    <div className="edit-field-container">
                        <label htmlFor="current-password">Current Password</label> <br />
                        <input type="password" name="currentPassword" value={currPass}
                            onChange={handleChange} required />
                    </div>

                    <div className="edit-field-container">
                        <label htmlFor="new-password">New Password</label> <br />
                        <input type="password" name="newPassword" value={newPass}
                            onChange={handleChange} required />
                    </div>

                    <div className="edit-field-container">
                        <label htmlFor="conf-new-password">Confirm new Password</label> <br />
                        <input type="password" name="confPassword" value={confPass}
                            onChange={handleChange} required />
                    </div>

                    <button className="btn-change-password">Change Password</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
