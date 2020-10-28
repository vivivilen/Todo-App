import React, {useState} from 'react'

const TopUp = () => {
    const [topUpValue, settTopUpValue] = useState(0);


    const handleChange = (e) => {
        if(e.target.name === "topUp") {
            settTopUpValue(e.target.value)
        }
    }

    return (
        <form className="topup-form-container">
            <h4 className="balance-label">Current Balance</h4>
            <p className="curr-balance">Rp 0</p>

            <div className="edit-field-container">
                <label htmlFor="top-up" className="topup-label">How much would you like to top up?</label> <br />
                <input type="number" name="topUp" value={topUpValue} onChange={handleChange} required/>
            </div>
            <button>Proceed</button>
        </form>
    )
}

export default TopUp
