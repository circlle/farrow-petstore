import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BottomBar from "./components/shared/BottomBar";
import Login from "./components/Login";
import Home from "./components/Home";
import My from "./components/My";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/category"}>Category</Route>
        <Route path={"/shopping"}>Shopping Cart</Route>
        <Route path={"/my"}>
          <My />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path={"/"}>
          <Home />
        </Route>
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;
