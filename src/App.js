import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
// import AdminDashboard from "./components/AdminDashboard";
import Cookies from "js-cookie";
import LoginPage from "./components/LoginPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [User, setUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = Cookies.get("userId");
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <Router>
      <div className="App">
        {/* <LoginPage /> */}
        {/* <Switch>
          <Route path="/login" exact>
            {User ? (
              <Redirect to="/Dashboard" />
            ) : (
              <div className="App__login">
                <Login
                  username={userName}
                  setUserName={setUserName}
                  password={password}
                  setPassword={setPassword}
                  User={User}
                  setUser={setUser}
                />
              </div>
            )}
          </Route>
          <Route path="/Dashboard" exact>
            {User ? (
              <div className="Dashboard">
                <AdminDashboard setUser={setUser} />
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/Home" exact>
            <div className="App__home">
              <Header User={User} />
              <Home />
            </div>
          </Route>
          <Redirect to="/Home" />
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;
