import React, { useContext } from "react";
import { useState } from "react";
import { handlepost } from "../http/userApi";
import { setToken } from "../http/auth";
import userContext from "../context/userContext";
export default function RegisterScreen() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { user, setUser } = useContext(userContext);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData } = await handlepost(data);
    console.log("register", userData.token);
    setToken(userData.token);
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    console.log(data);
  };

  return (
    <div className="container">
      <h1>register</h1>
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
