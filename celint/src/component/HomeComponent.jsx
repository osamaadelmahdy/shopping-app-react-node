import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";

export default function HomeComponent({ history }) {
  const { user } = useContext(userContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    })();
  }, []);

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };
  return (
    <div className="container ">
      <div className="row d-flex  align-items-center">
        <h1 className="display-4">home</h1>
        <Link to="/sell" className="btn btn-warning mx-3 ">
          Sell
        </Link>
        {user ? <h1 className="ml-auto"> Hello {user.username}</h1> : ""}
      </div>

      <div className="row ">
        {products.map(({ title, _id, img, about }) => {
          return (
            <div key={_id} id={_id} className="card mb-3 col-3 mr-3">
              <img
                className="card-img-top"
                src={img !== "#" ? img : "https://picsum.photos/150"}
                alt="product "
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p
                  className="card-text"
                  style={{ height: "100px", overflow: "auto" }}
                >
                  {about}
                </p>
                <button
                  onClick={() => handleClick(_id)}
                  className="btn btn-primary btn-block"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
