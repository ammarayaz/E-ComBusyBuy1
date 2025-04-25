import React, { useRef, useEffect, useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
  // Create your state or ref here to store the value of the input fields
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // write the submit handler function to validate the forma and signup the user
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!name || !email || password.length < 6) {
      toast.error("Please enter valid data.");
      return;
    }
    setLoading(true);
    await register(email, password);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className={styles.loginInput}
          ref={nameRef}
        />
        <input
          type="email"
          name="email"
          className={styles.loginInput}
          placeholder="Enter Email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          className={styles.loginInput}
          placeholder="Enter Password"
          ref={passwordRef}
        />
        <button className={styles.loginBtn}>
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
