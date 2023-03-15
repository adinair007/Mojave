import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import "./Login.css";
import MojaveLogo from "../../assets/MojaveLogo2.png";

import Auth from "../../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" src={MojaveLogo} alt="Mojave Logo" />
      </Link>
      <div className="login_container">
        <h1> Sign In </h1>
        <form onSubmit={handleFormSubmit}>
          <h5>E-mail</h5>
          <input
            className="form-input"
            placeholder="E-mail"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <h5>Password</h5>
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          {/* If error, display error, else do not show */}
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <button
            className="signIn_button"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p>
          By sigining-in, you agree to MOJAVE's Terms and Conditions of Use &
          Sale.
        </p>
        <Link to="/signup">
          <button
            className="create_button"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Create your MOJAVE account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
