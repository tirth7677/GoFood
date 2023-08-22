import React, { useState }from 'react'
import {Link, useNavigate} from 'react-router-dom'


function Login() {
  const [credenditals, setcredenditals] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()
  const handlesubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // in strinify firs key must be same name email location password according to the backend schema which is given by req.body
      body: JSON.stringify({email:credenditals.email,password:credenditals.password}),
    });
    const temp =await response.json()
    console.log(temp)
    if(!temp.success){
      alert("Enter valid credentials")
    }
    if(temp.success){
      localStorage.setItem("userEmail",credenditals.email)
      localStorage.setItem("authtoken",temp.authtoken)
      // console.log(localStorage.getItem("authtoken"))
      navigate('/')
    }
  };
  const onchanges = (event) => {
    setcredenditals({
      ...credenditals,
      // here name mean setcredenditals name which include all four names
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credenditals.email}
            onChange={onchanges}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            name="password"
            value={credenditals.password}
            onChange={onchanges}
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger ">
          New User
        </Link>
      </form>
    </div>
  )
}

export default Login