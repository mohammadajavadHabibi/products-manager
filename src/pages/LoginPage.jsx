import React, { useState, useEffect } from "react";
import api from "../configs/Api";
import { setCookie, getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/mutaitions";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { username, password } = form;

    if (!username || !password)
      return alert("Username and Password is Necessary!");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setCookie("token", data?.token);
          navigate("/products");
        },

        onError: (error) => {
          console.log(error);
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
