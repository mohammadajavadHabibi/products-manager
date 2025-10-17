import React, { useState, useEffect } from "react";
import api from "../configs/Api";
import { setCookie, getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
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
    const { username, password } = form;

    if (!username || !password) return alert("Username and Password is Necessary!");

    try {
      const response = await api.post("auth/login", form);

      if (!response.token) return alert("خطا در احراز هویت!");

      setCookie("token", response.token);
      navigate("/products", { replace: true }); // لاگین موفق -> محصولات
    } catch (error) {
      console.log(error);
      alert("خطا در ورود به سیستم");
    }
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
