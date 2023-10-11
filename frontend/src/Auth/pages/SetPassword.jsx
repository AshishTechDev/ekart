import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import SecondLoginPart from "../components/SecondLoginPart";

export default function SetPassword() {
  const newPassword = useRef();
  const cnf_password = useRef();
  const navigate = useNavigate();

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);

  const updatePasswordHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BACKEND_URL}update-password`,
        {
          password: newPassword.current.value,
          token: queryParams.get("token"),
          userId: queryParams.get("userId"),
        }
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
      return alert(err.response.data.message);
    }
  };

  return (
    <>
      <div className="logo-header">
        <Link to="/">
          <img src="../logo.png" alt="" />
        </Link>
      </div>
      <br />
      <div className={styles["main-login"]}>
        <div className={styles["login-part"]}>
          <form onSubmit={updatePasswordHandler}>
            <h1>Set New Password</h1>
            <input type="text" placeholder="New Password" ref={newPassword} />
            <br />
            <input
              type="password"
              placeholder="Re-type Password"
              ref={cnf_password}
            />
            <br />

            <button className={styles["btn-signIn"]}>Save</button>
          </form>
        </div>
        <SecondLoginPart />
      </div>
    </>
  );
}
