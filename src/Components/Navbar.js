import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
  const [cartview,setcartview] = useState(false)
  let data = useCart();
  const titleStyle = {
    marginLeft: "10px",
  };
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authtoken")
    navigate("/")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link
          className="navbar-brand fs-3 fst-italic"
          to="/"
          style={titleStyle}
        >
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authtoken") ? (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/MyOrder">
                  My Order
                </Link>
              </li>
            ) : (
              " "
            )}
          </ul>
          {!localStorage.getItem("authtoken") ? (
            <div className="d-flex">
              <Link class="btn bg-white text-success mx-3" to="/login">
                Login
              </Link>
              <Link class="btn bg-white text-success mx-3" to="/createuser">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-white text-success mx-3" onClick={()=>{setcartview(true)}}>My Cart{" "}<Badge pill bg='danger'>{data.length}</Badge> </div>
              {cartview? <Modal onClose={()=>setcartview(false)}><Cart/></Modal>:null}
              <div className="btn bg-white text-danger mx-3" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
