import React from "react";
import { useState } from "react";
import { loginUser } from "../http/userApi";
import { setToken } from "../http/auth";
import { withRouter } from "react-router-dom";
export default function LoginScreen() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData } = await loginUser(data);
    setToken(userData);

    window.location.reload();
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-lable" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            id="username"
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-4">
          <label className="form-lable" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          ></input>
        </div>

        <input className="btn btn-success" type="submit" value="Submit" />
      </form>
    </div>
  );
}
