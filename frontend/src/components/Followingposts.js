import React, { useState, useEffect, useContext } from "react";
import "../styles/Container.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Delete from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { userContext } from "../App";

function Container() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    fetch("/getFollowPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="container">
      {data.map((item) => {
        // console.log(item);
        return (
          <div key={item._id} className="container__main">
            <div className="container__header">
              <img src={item ? item.postedBy.pic : "Loading..."} alt="" />
              <h6>
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? `/profile/${item.postedBy._id}`
                      : `/profile`
                  }
                >
                  {item.postedBy.name}
                </Link>
              </h6>
              {item.postedBy._id === state._id && (
                <Delete onClick={() => deletePost(item._id)} />
              )}
            </div>
            <div className="container__body">
              <img src={item.photo} alt="" />
              <div className="container__bodyIcons">
                {item.likes.includes(state._id) ? (
                  <FavoriteIcon
                    color="secondary"
                    onClick={() => {
                      unlikePost(item._id);
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => {
                      likePost(item._id);
                    }}
                  />
                )}

                <ChatBubbleOutlineOutlinedIcon />
                <SendOutlinedIcon />
              </div>
              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {/* Make Comments page here down */}
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <hr></hr>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
                className="container__bodyFooter"
              >
                <input type="text" placeholder="Add a comment..." />
                <Button>Post</Button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Container;
