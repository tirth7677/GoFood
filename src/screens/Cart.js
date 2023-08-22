import React from "react";
import { useCart, useDispatchcart } from "../Components/ContextReducer";
import { json } from "react-router-dom";

function Cart() {
  let data = useCart();
  let dispatch = useDispatchcart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  const handlecheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:3001/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("order response", response)
    if(response.status===200){
      dispatch({type:"DROP"})
    }
  };
  let totalprice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Qantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalprice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handlecheckout}>Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
