import React, { useEffect, useRef, useState } from "react";
import { useDispatchcart, useCart } from "./ContextReducer";

function Card(props) {
  let dispatch = useDispatchcart();
  let data = useCart();
  let options = props.options;
  const priceref = useRef();
  let priceOptions = Object.keys(options);
  let [qty, setqty] = useState(1);
  let [size, setsize] = useState("");

  const handleaddtocart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.fooditems._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.fooditems._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.fooditems._id,
          name: props.fooditems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return
      }
    }
    await dispatch({
      type: "ADD",
      id: props.fooditems._id,
      name: props.fooditems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setsize(priceref.current.value);
  }, []);
  return (
    <div>
      <div className="card m-1" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.fooditems.img}
          alt="Card"
          className="card-img-top"
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.fooditems.name}</h5>
          {/* <p className="card-text">
            This is some important text */}
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceref}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            <hr></hr>
            <button
              className={"btn btn-success justify-center ms-2"}
              onClick={handleaddtocart}
            >
              Add to cart
            </button>
          </div>
          {/* </p> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
