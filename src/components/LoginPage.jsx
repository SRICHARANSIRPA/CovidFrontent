import React from "react";
// import SimpleLoginForm from "simple-login-form";
import { SimpleLoginForm } from "simple-login-form";
import "simple-login-form/dist/index.css";
function LoginPage() {
  const sendUserInfoToDatabase = (userInfo, event) => {};
  const formStyle = {
    maxWidth: "350px",
    maxHeight: "525px",
    background: "linear-gradient(#e66465, #9198e5)",
    borderRadius: "2%",
  };
  return (
    <div>
      <SimpleLoginForm
        getUserInfo={sendUserInfoToDatabase}
        style={formStyle}
        //  photoIcon={}
      />
    </div>
  );
}

export default LoginPage;
