import React from "react";
import "../CSS_FILES/Login.css";
import Input from "./Input";
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../middlewares/axios";
import { Dashboard } from "@material-ui/icons";
export default function Login({
  username,
  setUserName,
  password,
  setPassword,
  setUser,
  User,
}) {
  const history = useHistory();
  //Authentication
  const handleSuccess = ({ name, _id }, token) => {
    setUser({
      name: name,
      id: _id,
    });
    Cookies.set("userId", _id, { expires: 7 });
    Cookies.set("x-auth-token", token, { expires: 7 });
    history.replace("/Dashboard");
  };

  const handleFailure = (message) => {
    alert(message);
  };
  const Authencate = () => {
    const payload = {
      name: username,
      password: password,
    };

    axios
      .post("/api/auth", payload)
      .then(({ data }) => {
        console.log(data.message);
        data.success
          ? handleSuccess(data.data, data.token)
          : handleFailure(data.message);
      })
      .catch((err) => {
        console.log(err);
        alert("something failed");
      });
    setUserName("");
    setPassword("");
  };
  //Handlers
  const handleOnChange = (e) => {
    if (e.target.name === "UserName") {
      setUserName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var error = "";
    if (username === "") {
      error = error + " -> Please Enter username \n \n";
    }
    if (password === "") {
      error = error + " ->  Please Enter Password \n \n";
    }
    if (error !== "") {
      setUserName("");
      setPassword("");
      alert(error);
    } else {
      Authencate();
    }
  };

  return (
    <div className="Login">
      <h3>Welcome to Admin Portal</h3>
      <form action="Submit" className="Form">
        <Avatar className="Avatar" src="/broken-image.jpg" />
        <Input
          value={username}
          onChange={handleOnChange}
          label="UserName"
          type="text"
        />
        <Input
          value={password}
          onChange={handleOnChange}
          label="Password"
          type="password"
        />
        <Button
          onClick={handleSubmit}
          onSubmit={handleSubmit}
          variant="outlined"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
