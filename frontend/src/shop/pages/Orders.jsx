import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Orders.module.css";
import MainHeader from "../components/Header/MainHeader";
import AuthContext from "../../context/Auth-Context";
import OrdersList from "../components/Orders/OrdersList";

export default function Orders() {
  const ctx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const downloadInvoiceHandler = async (orderId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}orders/${orderId}`,
        {
          headers: {
            Authorization: "Bearer " + ctx.token,
          },
        }
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = orderId + ".pdf";
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND_URL}orders`,
          {
            headers: {
              Authorization: "Berer " + ctx.token,
            },
          }
        );
        const responseText = await response.json();
        setOrders(responseText.orders);
        console.log(responseText.orders);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <MainHeader />
      <div className={styles.order_heading}>Orders Details</div>
      <div className={styles.main_order}>
        <div className={styles.order_container}>
          {orders.map((order) => {
            return (
              <div key={order._id} className={styles.order_childContainer}>
                <div className={styles.transaction_heading}>
                  <h3> Transaction Id:#{order._id}</h3>
                  <Link
                    onClick={() => {
                      downloadInvoiceHandler(order._id);
                    }}
                  >
                    Download Invoice
                  </Link>
                </div>
                <OrdersList products={order.products} />
                <div>
                  <h4>
                    Address Details:-
                    {order.address.houseNo},&nbsp;{order.address.street},&nbsp;
                    {order.address.city},&nbsp;{order.address.pincode}
                  </h4>
                  <h4>Contact:-{order.address.contactNo}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
