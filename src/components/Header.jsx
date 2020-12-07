import React from "react";
import { Button } from "@material-ui/core";
import "../CSS_FILES/Header.css";
import { useHistory } from "react-router-dom";
function Header({ User, setUser }) {
  const history = useHistory();
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    console.log(User);
    User ? history.push("/Dashboard") : history.push("/login");
  };
  return (
    <div className="Header">
      <h1>
        Welcome to <strong className="Hub">MyCoVTest </strong>Hub
      </h1>
      <Button
        onClick={handleAdminSubmit}
        onSubmit={handleAdminSubmit}
        variant="outlined"
        type="submit"
      >
        Click Here For Admin Portal
      </Button>
    </div>
  );
}

export default Header;
