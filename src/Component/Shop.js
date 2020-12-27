import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import noPic from '../img/download.jpg';
import { useHistory } from 'react-router-dom';

const Shop = () => {
    const { token, logout, qty, setQty } = useContext(GlobalContext);
    const [dataShop, setDataShop] = useState([]);
    const [purchaseItem, setPurchaseItem] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/shop', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        }).then(res => {
            setDataShop(res.data.data)
        }).catch(err => {
            if (err.response.status === 401) {
                alert(err.response.data.message)
                logout(history);
            }
        })

        let local = localStorage.getItem('purchaseItem')
        if (local) {
            local = JSON.parse(local)
        } else {
            local = []
        }

        setPurchaseItem(local)
        let tempQty = 0
        local.map(i => {
            tempQty += i.qty;
        })
        setQty(tempQty)
    }, [])

    useEffect(() => {
        if (purchaseItem.length > 0)
            localStorage.setItem('purchaseItem', JSON.stringify(purchaseItem))
    }, [purchaseItem])

    const handleClick = (i) => {
        let newArray = [...purchaseItem];

        const sameId = purchaseItem.findIndex(pi => pi.item_id === i.item_id);

        if (sameId !== -1) {
            newArray[sameId] = {
                ...newArray[sameId],
                qty: newArray[sameId].qty + 1,
                total_price: (newArray[sameId].qty + 1) * newArray[sameId].price
            }
            console.log('qty: ', newArray[sameId].qty)
            setPurchaseItem(newArray)
        } else {
            setPurchaseItem(prevItem => [...prevItem, {
                item_id: i.item_id,
                name: i.name,
                price: i.price,
                qty: 1,
                total_price: (1 * i.price)
            }])
        }
        setQty(qty + 1)
    }

    return (
        <div className="shop-container">
            {dataShop.map(shop => {
                return (
                    <div className="shop-item" key={shop.item_id}>
                        <img src={noPic} alt={shop.name}></img>
                        <h4 className="title">{shop.name}</h4>
                        <p className="desc">{shop.description}</p>
                        <p className="price">Rp. {shop.price}</p>
                        <button onClick={() => handleClick(shop)} className="add-to-cart-btn">Add to cart</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Shop
