import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "../styles/createPost.css";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function CreatPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#b71c1c red darken-3" });
          } else {
            M.toast({
              html: "Created Success",
              classes: "#388 green darken-2",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
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
  return (
    <div className="createPost">
      <h3>New Post</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        type="text"
        placeholder="Description"
      />
      <div className="file-field input-field">
        <div className="btn #0095f6 blue darken-1">
          <span>Upload</span>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <Button onClick={() => postDetails()}>Post</Button>
    </div>
  );
}

export default CreatPost;
