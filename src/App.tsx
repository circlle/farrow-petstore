import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BottomBar from "./components/shared/BottomBar";
import Login from "./components/Login";
import Home from "./components/Home";
import My from "./components/My";
import CategoryDetail from "./components/CategoryDetail"
import PetDetail from "./components/PetDetail";
import Order from "./components/Order";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/pet/:petId"}>
          <PetDetail />
        </Route>
        <Route path={"/category/:categoryId"}>
          <CategoryDetail />
        </Route>
        {/* <Route path={"/shopping"}>Shopping Cart</Route> */}
        <Route path={"/my"}>
          <My />
        </Route>
        <Route path={"/order"}>
          <Order />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path={"/signup"}>
          <SignUp />
        </Route>
        <Route path={"/"}>
          <Home />
        </Route>
      </Switch>
      {/* solve fixed bottom bar naively */}
      <div style={{ height: 64 }}></div>
      <BottomBar />
    </Router>
  );
}

export default App;
