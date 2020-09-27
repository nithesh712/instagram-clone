import { Button } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import "../styles/Profile.css";
import "../styles/UserProfile.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

function Profile() {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(userContext);
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? state.followers.includes(userid) : true
  );

  //   console.log(userid);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setProfile(result);
      });
  }, []);
  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );

          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile__div1">
            <div>
              <img
                className="profile__image"
                src={userProfile.user.pic}
                alt=""
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h4>{userProfile.user.email}</h4>
              <div className="profile__details">
                <h6>{userProfile.posts.length} Posts</h6>
                <h6>{userProfile.user.followers.length} Followers</h6>
                <h6>{userProfile.user.following.length} Following</h6>
              </div>
              <div className="profile__buttons">
                {showFollow ? (
                  <Button onClick={() => followUser()}>
                    <PersonAddIcon color="primary" />
                  </Button>
                ) : (
                  <Button onClick={() => unfollowUser()}>
                    <PersonAddDisabledIcon color="secondary" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="profile__div2">
            {userProfile.posts.map((item) => {
              return <img key={item._id} src={item.photo} alt="" />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </>
  );
}

export default Profile;
