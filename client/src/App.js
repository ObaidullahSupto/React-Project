import React from "react";
import Head from "./components/layouts/Head";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import View from "./components/View";
import Users from "./components/Users";

function App() {
  return (
    <div>
      <Head />
      <BrowserRouter>
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/view" component={View} />
        <Route path="/users" component={Users} />
      </BrowserRouter>
    </div>
  );
}

export default App;
