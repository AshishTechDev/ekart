import React from "react";
import styles from "./OrdersList.module.css";

export default function OrderList(props) {
  return (
    <>
      {props.products.map((product) => {
        return (
          <div key={product._id} className={styles.productDetails}>
            <div className={styles.order_details}>
              <h4>Product Name-{product.productId.title}</h4>

              <h4>
                Product Cost-
                {product.productId.price * product.quantity}
              </h4>
            </div>
            <div className={styles.order_img}>
              <img
                src={
                  import.meta.env.VITE_ASSET_URL + product.productId.imageUrl
                }
                alt={product.productId.title}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
