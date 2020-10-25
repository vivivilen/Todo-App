import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';

const Profile = () => {
    const { token, setDataUser, dataUser } = useContext(GlobalContext);

    const [loggedInProfile, setLoggedInProfile] = useState({})
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/user/me', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        })
            .then(res => {
                setLoggedInProfile(res.data.data)
                setEditedName(res.data.data.name)
                setEditedEmail(res.data.data.email)
            })
    }, [])

    const handleChange = (e) => {
        if (e.target.name === 'editedName') {
            setEditedName(e.target.value)
        } else if (e.target.name === 'editedEmail') {
            setEditedEmail(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let isEmailSame = loggedInProfile.email === editedEmail ? true : false;

        axios.put('http://127.0.0.1:8000/user/me/update', {
            name: editedName,
            email: editedEmail,
            is_email_same: isEmailSame
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setDataUser(res.data.data)
                localStorage.setItem('dataUser', JSON.stringify(res.data.data))
                alert("Change profile success!");
            }
        })
    }

    return (
        <div className="profile-container">
            <div className="profile-item">
                <form className="form-change-profile" onSubmit={handleSubmit}>
                    <h4>Profile Detail</h4>

                    <div className="edit-field-container">
                        <label htmlFor="full-name">Name</label> <br />
                        <input type="text" name="editedName" value={editedName} onChange={handleChange} />
                    </div>

                    <div className="edit-field-container">
                        <label htmlFor="email">Email</label> <br />
                        <input type="email" name="editedEmail" value={editedEmail} onChange={handleChange} />
                    </div>

                    <button className="btn-update">Update Profile</button>
                </form>
            </div>
        </div>
    )
}

export default Profile
