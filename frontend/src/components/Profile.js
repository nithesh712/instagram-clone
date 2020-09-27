import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../App";
import "../styles/Profile.css";

function Profile() {
  const [myPics, setMyPics] = useState([]);
  const [image, setImage] = useState("");
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setMyPics(result);
      });
  }, []);

  // useEffect(() => {
  //   if (image) {
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "instagram");
  //     data.append("cloud_name", "dmxlnl9ee");

  //     fetch("https://api.cloudinary.com/v1_1/dmxlnl9ee/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log(data);
  //         // localStorage.setItem(
  //         //   "user",
  //         //   JSON.stringify({ ...state, pic: data.url })
  //         // );
  //         // dispatch({ type: "UPDATEPIC", payload: data.url });
  //         fetch("/updatepic", {
  //           method: "put",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + localStorage.getItem("jwt"),
  //           },
  //           body: JSON.stringify({
  //             pic: data.url,
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((result) => {
  //             console.log(result);
  //             localStorage.setItem(
  //               "user",
  //               JSON.stringify({ ...state, pic: result.pic })
  //             );
  //             dispatch({ type: "UPDATEPIC", payload: result.pic });
  //             //window.location.reload()
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [image]);
  // const updatePhoto = (file) => {
  //   setImage(file);
  // };
  // console.log(state);

  return (
    <div className="profile">
      <div className="profile__div1">
        <div className="profile__info">
          <img
            className="profile__image"
            src={state ? state.pic : "Loading"}
            alt=""
          />
          {/* <span>Update Image</span>
          <input onChange={(e) => updatePhoto(e.target.files[0])} type="file" /> */}
        </div>
        <div>
          <h4>{state ? state.name : "Loading..."}</h4>
          <h4>{state ? state.email : "Loading..."}</h4>
          <div className="profile__details">
            <h6>{myPics.length} Posts</h6>
            <h6>{state ? state.followers.length : "0"} Followers</h6>
            <h6>{state ? state.following.length : "0"} Following</h6>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="profile__div2">
        {myPics.map((item) => {
          return (
            <img
              className="profile__images"
              key={item._id}
              src={item.photo}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
