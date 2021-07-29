import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { addProduct, getProduct } from "../http/productApi";

export default function ProductScreen({ match }) {
  const { id } = match.params;
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data: product } = await getProduct(id);
      setProduct(product);
      setLoading(false);
    })();
  }, []);

  const handleClick = async (id) => {
    const add = await addProduct(id);
    console.log("add", add);
  };
  return (
    <div>
      {product ? (
        <div className="container">
          <div className="row ">
            <div className="col-6 d-flex flex-column justify-content-center">
              <h1>{product.title}</h1> <p>{product.about}</p>
              <button
                onClick={() => {
                  handleClick(product._id);
                }}
                type="button"
                className="btn btn-primary mt-5 "
              >
                BUY NOW
              </button>
            </div>
            <div className="col-6">
              <img
                src={
                  product.img !== "#"
                    ? product.img
                    : "https://picsum.photos/150"
                }
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
