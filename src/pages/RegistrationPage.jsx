import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // بررسی لاگین بودن کاربر هنگام ورود به صفحه
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/products", { replace: true }); // کاربر لاگین کرده -> مستقیم به محصولات
    }
  }, [navigate]);

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = form;

    if (!username || !password)
      return alert("Username and Password is Necessary!");
    if (password !== confirmPassword)
      return alert("Passwords aren't the same!");

    navigate("/login"); // بعد از ثبت‌نام به صفحه لاگین می‌ره
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={changeHandler}
        value={form.username}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={changeHandler}
        value={form.password}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={changeHandler}
        value={form.confirmPassword}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationPage;
