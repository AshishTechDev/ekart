import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./ResetPassword.module.css";
import SecondLoginPart from "../components/SecondLoginPart";
import { useRef } from "react";

export default function ResetPassword() {
  const userEmail = useRef();

  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}reset`,
        {
          email: userEmail.current.value,
        }
      );

      alert(result.data.message);
    } catch (err) {
      return alert(err.response.data.message);
    }
    userEmail.current.value = "";
  };
  return (
    <>
      <div className="logo-header">
        <img src="../logo.png" alt="" />
      </div>
      <div className={styles["main-login"]}>
        <div className={styles["login-part"]}>
          <form onSubmit={resetPasswordHandler}>
            <h1>Account Verification</h1>
            <h4>
              Enter the email address associated with your Dell account to
              receive one-time password
            </h4>
            <input type="email" ref={userEmail} placeholder="Enter Email" />
            <br />

            <button className={styles["btn-signIn"]}>Reset Password</button>
            <p>
              Remeber Your Password?
              <Link>
                <u>Sign In</u>
              </Link>
            </p>
          </form>
        </div>
        <SecondLoginPart />
      </div>
    </>
  );
}
