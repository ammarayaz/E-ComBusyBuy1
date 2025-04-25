import React, { useRef, useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || password < 6) {
      toast.error("Please enter the valid credentials.");
      return;
    }

    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          ref={passwordRef}
        />
        <button className={styles.loginBtn}>
          {loading ? "..." : "Sign In"}
        </button>
        <NavLink
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#224957",
            fontFamily: "Quicksand",
          }}
        >
          <p style={{ fontWeight: "600", margin: 0 }}>Or SignUp instead</p>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
