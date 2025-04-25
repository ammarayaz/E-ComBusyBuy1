import React, { useEffect, useState } from "react";
import styles from "./OrdersPage.module.css";
import { useAuth } from "../../context/Auth/AuthContext";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import OrderTable from "../../components/OrderTable/OrderTable";
import Loader from "../../components/UI/Loader/Loader";

const OrdersPage = () => {
  const { user } = useAuth(); // get current authenticated user
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      console.log("Fetching orders for user:", user.uid);
      try {
        const q = query(
          collection(db, "orders"),
          where("user", "==", user.uid),
          orderBy("createdAt", "desc") // <-- Requires composite index
        );
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched orders:", fetchedOrders);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]); // Trigger the effect when the user changes

  if (loadingOrders) return <Loader />;

  if (!orders.length) {
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;
  }

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <OrderTable
          key={order.id}
          order={order.cart} // Passing the array of ordered products
          date={order.createdAt.toDate()} // Firestore timestamp converted to JavaScript Date
        />
      ))}
    </div>
  );
};

export default OrdersPage;
