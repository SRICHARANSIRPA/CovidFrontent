import React from "react";
import { Button } from "@material-ui/core";
import "../CSS_FILES/AdminHeader.css";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function AdminHeader({ setUser }) {
  const history = useHistory();
  const handleLogout = () => {
    Cookies.remove("userId");
    setUser(null);
    history.push("/home");
  };
  return (
    <div className="AdminHeader">
      <h1>
        Welcome to <strong className="Hub">MyCoVTest </strong>Hub Dashboard
      </h1>
      <Button
        onClick={handleLogout}
        onSubmit={handleLogout}
        variant="outlined"
        type="submit"
      >
        Logout
      </Button>
    </div>
  );
}

export default AdminHeader;
