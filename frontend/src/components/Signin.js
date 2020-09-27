import React, { useState, useContext } from "react";
import "../styles/Signin.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import M from "materialize-css";
import { userContext } from "../App";

function Signin() {
  const { state, dispatch } = useContext(userContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const postData = () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Invalid Email",
        classes: "#b9f6ca red darken-3",
      });
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#b71c1c red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "Signin Success", classes: "#388 green darken-2" });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="signin">
      <div className="signin__card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt=""
        />
        <div className="signin__input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: "1px solid black",
              height: "30px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: "1px solid black",
              height: "30px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          />
        </div>
        <Button
          onClick={() => postData()}
          variant="contained"
          color="primary"
          className="signin__button"
        >
          Signin
        </Button>
        <p className="signin__pera">
          Dont Have an Account?{" "}
          <Link to="/signup" className="signin__link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
