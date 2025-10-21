import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie";
import { useLogin } from "../services/mutaitions";

function LoginPage({ setToken }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { username, password } = form;

    if (!username || !password) return alert("Username and Password is Necessary!");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setCookie("token", data?.token);  // ذخیره توکن
          setToken(data?.token);           // بروزرسانی state توکن → هدایت خودکار
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
