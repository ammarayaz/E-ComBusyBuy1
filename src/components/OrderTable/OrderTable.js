import React from "react";
import styles from "./OrderTable.module.css";
import { convertDate } from "../../utils/utils";

// Component to display user order in table format
const OrderTable = ({ order, date }) => {
  if (!order?.length) return null;

  const totalPrice = order.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {date && <h2>Ordered On:- {convertDate(date)}</h2>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.map((product, idx) => {
            return (
              <tr key={idx}>
                <td>{product.title.slice(0, 25) + "..."}</td>
                <td>{`₹ ${product.price} `}</td>
                <td>{`${product.quantity} `}</td>
                <td>{`₹ ${product.quantity * product.price}`}</td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
        <tfoot>
          <tr className={styles.totalPrice}>
            <td>
              ₹
              {order.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderTable;
