import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import UserProfile from "./components/UserProfile";
import CreatePost from "./components/CreatePost";
import { reducer, initialState } from "./reducer/userReducer";
import FollowingPosts from "./components/Followingposts";

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/followersposts">
        <FollowingPosts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
