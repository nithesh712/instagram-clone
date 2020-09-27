import React, { useEffect, useState } from "react";
import "../styles/Signin.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import M from "materialize-css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadPhoto = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dmxlnl9ee");

    fetch("https://api.cloudinary.com/v1_1/dmxlnl9ee/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Invalid Email",
        classes: "b9f6ca red darken-3",
      });
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#b71c1c red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#388 green darken-2" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = () => {
    if (image) {
      uploadPhoto();
    } else {
      uploadFields();
    }
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
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              border: "1px solid black",
              height: "30px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          />
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
            type="password"
            placeholder="Password"
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
        <div className="file-field input-field">
          <div className="btn #0095f6 blue darken-1">
            <span>Upload Image</span>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <Button
          onClick={() => postData()}
          variant="contained"
          color="primary"
          className="signin__button"
        >
          Signup
        </Button>
        <p className="signin__pera">
          Already Have an Account?{" "}
          <Link to="/signin" className="signin__link">
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
