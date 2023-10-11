import styles from "./AddressList.module.css";
import { Link } from "react-router-dom";
import deleteIcon from "../../../assets/delete-icon.jpg";
import editIcon from "../../../assets/edit-icon.jpg";
export default function AddressList(props) {
  return (
    <>
      <div className={styles["showAddress_container"]}>
        <h3>Addresses</h3>
        <div className={styles["addressList_container"]}>
          {props.Addresses.map((address) => {
            return (
              <div className={styles["addresslist"]} key={address._id}>
                <input type="radio" name="selectedAdresses" />
                <div>House Number:{address.houseNo}</div>
                <div>Street:{address.street}</div>
                <div>Pin Code:{address.pincode}</div>
                <div>Contact:{address.contactNo}</div>
                <span className={styles["operations"]}>
                  <img
                    src={editIcon}
                    alt="edit-address"
                    onClick={props.showAddressform}
                  />

                  <img
                    src={deleteIcon}
                    alt="delete-address"
                    onClick={() => {
                      props.deleteaddress(`${address._id}`);
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <Link className={styles["checkout"]} to="/create-payment-intent">
          Proceed to payment
        </Link>
      </div>
    </>
  );
}
