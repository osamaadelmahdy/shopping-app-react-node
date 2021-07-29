import React from "react";
import { useState } from "react";
import { handlepost } from "../http/productApi";

export default function SellScreen({ history }) {
  const [data, setData] = useState({
    title: "",
    about: "",
    img: "",
    price: "",
  });
  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData } = await handlepost(data);
    console.log("sell", userData);
    history.push("/");
  };
  return (
    <div className="container row my-5 ">
      <div className=" col-4 offset-2 my-5 ">
        <h1>Sell Screen</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            className="form-control mt-3"
            placeholder="Title"
            value={data.title}
            onChange={handleChange}
          />
          <input
            name="about"
            type="text"
            className="form-control mt-3"
            placeholder="About"
            value={data.about}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            className="form-control mt-3"
            placeholder="Price"
            value={data.price}
            onChange={handleChange}
          />
          <input
            name="img"
            type="url"
            className="form-control mt-3"
            placeholder="Image"
            value={data.img}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
