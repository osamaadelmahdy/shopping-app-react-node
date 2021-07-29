import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteCart, getCart } from "../http/productApi";

export default function CartScreen() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCart();
        setProduct(data);
        console.log("data cart", data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleClick = async (id) => {
    const data = await deleteCart(id);
    setProduct(
      product.filter((p) => {
        return p._id !== id;
      })
    );
  };
  return (
    <div className="container">
      <h1>your cart</h1>
      <div className="row  ">
        {product ? (
          product.map(({ title, _id, img, about }) => {
            return (
              <div key={_id} id={_id} className="card mb-3 col-3 mr-3">
                <img
                  className="card-img-top"
                  src={img !== "#" ? img : "https://picsum.photos/150"}
                  alt="product "
                />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <button
                    onClick={() => handleClick(_id)}
                    className="btn btn-danger btn-block"
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </div>
  );
}
