import React, { useContext } from "react";
import "../styles/Navbar.css";
import { Avatar, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExploreIcon from "@material-ui/icons/Explore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";
import { Search } from "@material-ui/icons";

function Navbar() {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <Link className="navbar__link">
          <Search />
        </Link>,
        <Link className="navbar__link" to="/followersposts">
          <HomeIcon />
        </Link>,
        <Link className="navbar__link" to="/createpost">
          <AddCircleOutlineIcon />
        </Link>,
        <Link className="navbar__link" to="/">
          <ExploreIcon />
        </Link>,
        <Link className="navbar__link" to="/profile">
          <Avatar src={state ? state.pic : "Loading"} alt="" />
        </Link>,
        <Button
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/signin");
          }}
          className="navbar__link"
        >
          <ExitToAppIcon />
        </Button>,
      ];
    } else {
      return [
        <Link className="navbar__link" to="/signup">
          <AccountBoxIcon />
        </Link>,
      ];
    }
  };
  return (
    <div className="navbar">
      <div className="navbar__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt=""
        />
      </div>
      <div className="navbar__right">{renderList()}</div>
    </div>
  );
}

export default Navbar;
