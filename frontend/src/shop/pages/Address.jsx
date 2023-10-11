import styles from "./Address.module.css";
import { Link } from "react-router-dom";
import Button from "../../shared/components/UIElements/Button";
import AddressList from "../components/Address/AddressList";
import AuthContext from "../../context/Auth-Context";
import { useRef, useState, useContext, useEffect } from "react";

export default function AddAddress() {
  const [addressForm, setAddressForm] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const house_No = useRef();
  const street = useRef();
  const city = useRef();
  const pincode = useRef();
  const contactNo = useRef();
  const ctx = useContext(AuthContext);

  const saveAddressHandler = async (event) => {
    event.preventDefault();
    const Address = {
      houseNo: house_No.current.value,
      street: street.current.value,
      city: city.current.value,
      pincode: +pincode.current.value,
      contactNo: +contactNo.current.value,
    };
    console.log(Address);
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}add-address`,
      {
        method: "PATCH",
        body: JSON.stringify(Address),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + ctx.token,
        },
      }
    );
    const responseText = await response.json();

    setUserAddress(responseText.addresses);
  };

  useEffect(() => {
    const getAddress = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}get-address`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + ctx.token,
          },
        }
      );
      const responseText = await response.json();
      if (!response.ok) {
        return false;
      }
      setUserAddress(responseText.addresses);
    };
    getAddress();
  }, []);

  const deleteAddressHandler = async (addressid) => {
    console.log(addressid);
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}deleteaddress/${addressid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + ctx.token,
        },
      }
    );
    if (!response.ok) {
      return false;
    }
    const responseText = await response.json();

    setUserAddress(responseText.updatedAddress);
  };
  const showAddressform = () => {
    setAddressForm(
      <div className={styles["addAddress_container"]}>
        <div className={styles["addAddress_form"]}>
          <h3>Shipping Address</h3>
          <form onSubmit={saveAddressHandler} method="POST">
            <input
              type="text"
              name="houseNo"
              placeholder="House No."
              ref={house_No}
            />
            <input
              type="text"
              name="street"
              placeholder="Street/Localtiy"
              ref={street}
            />
            <input type="text" name="city" placeholder="City" ref={city} />
            <input
              type="text"
              name="pincode"
              placeholder="Postal Code"
              ref={pincode}
            />
            <input
              type="tel"
              name="contactNo"
              placeholder="Contact No"
              ref={contactNo}
            />
            <Button className={styles["add_address_button"]}>
              Add Address
            </Button>
          </form>
        </div>
        <div className={styles["addAddress_image"]}>
          <img src="../Delivery.jfif" alt="" />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="logo-header">
        <Link to="/">
          <img src="../logo.png" alt="" />
        </Link>
      </div>
      <div className={styles["new_address"]}>
        <Button onClick={showAddressform}>+Add new Address</Button>
      </div>
      {addressForm}

      <AddressList
        Addresses={userAddress}
        deleteaddress={deleteAddressHandler}
        showAddressform={showAddressform}
      />
    </>
  );
}
