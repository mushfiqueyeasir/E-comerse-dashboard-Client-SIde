import React from "react";

import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateData } from "../../hooks/update";
import {
  alignBodyStyle,
  divGridItemStyle,
  forgotPassStyle,
  formBodyStyle,
  formInputStyle,
  loginStyle,
  registerStyle,
} from "./styledClass";

const Login = () => {
  const [forgotPass, setForgotPass] = useState("Forgot your password?");

  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");

  const handleForgotPass = () => {
    setForgotPass("Contact Admin!");
  };

  const login = (e) => {
    e.preventDefault();

    sessionStorage.clear();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    updateData({
      endPoint: `login`,
      data: data,
      method: "POST",
      login: true,
      navigate: navigate,
    });
  };

  return (
    <div>
      <div className={alignBodyStyle}>
        <div className={divGridItemStyle}>
          <div className={registerStyle}>
            <h2 className={loginStyle}>Login</h2>

            <form onSubmit={login} className={formBodyStyle}>
              <div className="form__field">
                <input
                  ref={email}
                  className={formInputStyle}
                  type="text"
                  placeholder="Email"
                />
              </div>

              <div className="form__field">
                <input
                  ref={password}
                  className={formInputStyle}
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div className="form__field">
                <input
                  className={formInputStyle}
                  type="submit"
                  value="Sign In"
                />
              </div>
            </form>
            <button
              type="button"
              onClick={handleForgotPass}
              className={forgotPassStyle}
            >
              {forgotPass}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
