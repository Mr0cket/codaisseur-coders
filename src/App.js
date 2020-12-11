import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { PostPage } from "./views";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";

export default function App() {
  return (
    <>
      <header>
        <Link to="/login">login</Link>
      </header>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/posts/:id" component={PostPage} />
      </Switch>
    </>
  );
}
