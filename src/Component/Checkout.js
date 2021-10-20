import React, { useContext, useEffect } from "react";
import axios from "axios";
import EmptyCart from '../Component/EmptyCart';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from "../Context/GlobalContext";

const Checkout = () => {
  const { token, qty, setQty } = useContext(GlobalContext);

  let local = []
  local = JSON.parse(localStorage.getItem("purchaseItem"));
  console.log(local);

  const history = useHistory()

  const totalPrice = local === null ? 0 : local.reduce((total, l) => total + l.total_price, 0);

  const purchase = () => {
    axios
      .post(
        "http://6c5e-103-92-225-75.ap.ngrok.io/purchase",
        {
          notes: "My Purchase",
          purchased_items: local,
          total_price: totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          let localDataUser = JSON.parse(localStorage.getItem('dataUser'))

          localDataUser.wallet = localDataUser.wallet - totalPrice;
          localStorage.setItem('dataUser', JSON.stringify(localDataUser))
          localStorage.removeItem('purchaseItem')
          setQty(0)

          alert('Purchase succeed!')
          history.push('/')
        }
      })
      .catch((err) => {
        if (err.response.request.status === 400) {
          alert('You have insufficient balance. Please do top up first.')
          history.push('/top-up')
        }
      });
  };

  return (
    <div className='checkout-container'>
      {local === null ? <EmptyCart /> :
        <div>
          <h1>Cart</h1>
          <div className="checkout-item">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {local.map((l) => {
                  return (
                    <tr key={l.item_id}>
                      <td>{l.name}</td>
                      <td>{l.price}</td>
                      <td>{l.qty}</td>
                      <td>Rp. {l.total_price}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="3" className="subtotal">Subtotal</td>
                  <td className="subtotal-value">Rp. {totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn-purchase" onClick={purchase}>
              Purchase
        </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Checkout;
