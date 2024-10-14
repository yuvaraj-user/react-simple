import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useForm } from "react-hook-form";

export default function Login({setToken}) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [logged, setlogged] = useState();
  const [hideError, setHideError] = useState(false);

  useEffect(() => {
    let storage_data = localStorage.getItem("token");
    if (storage_data) {
      setlogged(storage_data);
    }
  });

  useEffect(() => {
    setHideError(false);
    setTimeout(function(){
      setHideError(true);
    },3000);
  },[errors.email,errors.password]);

  const onSubmit = async (data) => {
    setHideError(false);
    let email = data.email;
    let password = data.password;

    const token = await LoginUser({
      email,
      password,
    });

    
    setToken(JSON.stringify(token.user));

    if (localStorage.getItem("token") != "undefined") {
      navigate("/dashboard");
    } else {
      // toast(token.data.msg);
      navigate("/");
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = await LoginUser({
  //     email,
  //     password,
  //   });

  //   setToken(JSON.stringify(token.user));

  //   if (localStorage.getItem("token") != "undefined") {
  //     navigate("/dashboard");
  //   } else {
  //     // toast(token.data.msg);
  //     navigate("/");
  //   }
  // };

  async function LoginUser(credentials) {
    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then(response => {
      // Extract status code from response
      const statusCode = response.status;  
      // Check if response is OK (status code 200)
      if (response.ok) {
        return response.json(); // Parse response body as JSON
      } else {
        throw new Error('Request failed'); // Handle error
      }
    }).then(data => {
      return data; // Parse response body as JSON
    });
  }

  // return (
  //   <div className="login-wrapper">
  //     <div className="card login-card">
  //       <div className="card-body">
  //       <ToastContainer />
  //         <form onSubmit={handleSubmit}>
  //           <h3>Sign In</h3>
  //           <div className="mb-3">
  //             <label>Email address</label>
  //             <input
  //               type="email"
  //               className="form-control"
  //               placeholder="Enter Name"
  //               onChange={(e) => setemail(e.target.value)}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label>Password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               placeholder="Enter password"
  //               onChange={(e) => setpassword(e.target.value)}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <div className="custom-control custom-checkbox">
  //               <input
  //                 type="checkbox"
  //                 className="custom-control-input"
  //                 id="customCheck1"
  //               />
  //               <label className="custom-control-label" htmlFor="customCheck1">
  //                 Remember me
  //               </label>
  //             </div>
  //           </div>
  //           <div className="d-grid">
  //             <button type="submit" className="btn btn-primary">
  //               Submit
  //             </button>
  //           </div>
  //           <p className="forgot-password text-right">
  //             Forgot <a href="#">password?</a>
  //           </p>
  //         </form>
  //       </div>
  //     </div>

  //     {/* <h1>Please Log In</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         <p>Username</p>
  //         <input type="text" onChange={e => setusername(e.target.value)}/>
  //       </label>
  //       <label>
  //         <p>Password</p>
  //         <input type="password" onChange={e => setpassword(e.target.value)} />
  //       </label>
  //       <div>
  //         <button type="submit">Submit</button>
  //       </div>
  //     </form> */}
  //   </div>
  // );

  return (
  // <div className="container mx-auto my-auto">
  //   <div className="row">
    <div className="card login-card mx-auto my-auto">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 login-left">
              <div className="text-center">
                <h2 className="header">Sign in to XYZ</h2>
                <div className="d-flex justify-content-center mt-4 mb-4">
                  <div className="icon-div">
                    <i className="fa fa-facebook fb-icon" aria-hidden="true"></i>
                  </div>
                  <div className="icon-div ms-3">
                    <i className="fa fa-google gl-icon" aria-hidden="true"></i>
                  </div>
                  <div className="icon-div ms-3">
                    <i className="fa fa-linkedin lin-icon" aria-hidden="true"></i>
                  </div>
                </div>

                <p className="mb-4 text-muted fw-bold">
                  or use your gmail account
                </p>
                <div className="mb-3 d-flex">
                  <i className="fa fa-envelope icon" aria-hidden="true"></i>
                  <input
                    type="email"
                    className="form-control login-textbox"
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                    {...register("email",
                    {
                        required: "Email is required.",
                        pattern: {
                          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid email address."
                        } 
                    })}
                  />
                </div>
                  {!hideError && errors.email && <div className="error-message mb-2">{errors.email.message}</div>}
                <div className="mb-3 d-flex">
                  <i className="fa fa-unlock-alt icon p-icon" aria-hidden="true"></i>
                  <input
                    type="password"
                    className="form-control login-textbox"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 5,
                        message: "Password length must be greater than or equal to 5."
                      }
                      // pattern: {
                      //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                      //   message: "Please enter strong password."
                      // } 
                  })}
                  />
                </div>
                  {!hideError && errors.password && <div className="error-message mb-2">{errors.password.message}</div>}
                <a className="fpassword-link" href="#">
                  Forgot Your Password?
                </a>
                <div className="d-flex justify-content-center mt-5">
                  <button className="btn signin-btn" type="submit">SIGN IN</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 login-right">
              <div>
                <div className="text-center">
                  <h2 className="text-white">Hello, Friend!</h2>
                  <div className="mt-4 mb-4">
                    <span className="text-white">
                      Enter your personal details{" "}
                    </span>
                    <br></br>
                    <span className="text-white">
                      and start journey with us
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn signup-btn">SIGN UP</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </div>  

    // </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
