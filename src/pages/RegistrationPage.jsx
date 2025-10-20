import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import { useRegister } from "../services/mutaitions";

function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { mutate } = useRegister();
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

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/login"); // بعد از ثبت‌نام به صفحه لاگین می‌ره
        },

        onError: (error) => {
          console.log(error.message);
        },
      }
    );
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
