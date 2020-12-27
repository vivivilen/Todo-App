import React, { useEffect, useContext } from "react";
import axios from "axios";
import {Pagination} from 'antd'
// import 'antd/dist/antd.css'
import { GlobalContext } from "../Context/GlobalContext";
import { useState } from "react";

const TransactionHistory = () => {
  const [transHistory, setTransHistory] = useState([]);
  const { token } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/me/history", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((res) => setTransHistory(res.data.data))
      .catch((err) => console.log(err.response));
  });

  return (
    <div>
      <h1>Transaction History</h1>

      <div className="trans-history-container">
        {transHistory.map((i) => {
        //   console.log(i);
          return (
            <div className="trans-history-items" key={i.master_transaction_id}>
              <p>{i.master_transaction_id}</p>
              <p>{i.created_at}</p>
              <p>{i.purchased_items.length} item(s)</p>
            </div>
          );
        })}
        <Pagination defaultCurrent={1} total={transHistory.length} />
      </div>
    </div>
  );
};

export default TransactionHistory;
