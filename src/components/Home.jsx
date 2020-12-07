import React, { useState } from "react";
import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import { Button } from "@material-ui/core";
import IsValidEmail from "../Util/ValidMailAddress";
import Cookies from "js-cookie";
import axios from "../middlewares/axios";
import "../CSS_FILES/Home.css";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  //Variables
  const [email, setEmail] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [Age, setAge] = useState(null);
  const [Result, setResult] = useState(null);
  const [Address, setAddress] = useState(null);
  const [TTN, setTTN] = useState(null);
  const [Postcode, setPostcode] = useState(null);

  const handleSuccess = ({ data }) => {
    alert("Data Uploaded Successfully");
  };

  const handleFailure = ({ message }) => {
    alert(message);
  };

  const Persist = () => {
    const header = {
      "x-auth-token": Cookies.get("x-auth-token"),
    };
    const payload = {
      email: email,
      FullName: FullName,
      Age: Age,
      Result: Result,
      Address: Address,
      TTN: TTN,
      Postcode: Postcode,
    };

    axios
      .post("/api/covidData", payload, { headers: header })
      .then(({ data }) => {
        data.success ? handleSuccess(data) : handleFailure(data);
      })
      .catch((err) => {
        alert("Something Failed \n" + err);
      });
  };

  //TTN Codes
  const validTTNCodes = [
    "MM2874Z6",
    "FEQQ6UUG",
    "34GC829B",
    "CB8FBCCM",
    "8RL4ENTK",
    "57UBS5J6",
    "4F7YKH9G",
    "R9KZ2NXL",
    "YBQUVXHL",
    "CCZTQ8KW",
  ];
  //Result Types
  const ResultTypes = ["POSITIVE", "NEGATIVE", "INCONCLUSIVE"];

  //Handlers
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleResult = (label) => {
    setResult(label);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleName = (e) => {
    setFullName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleTTNCode = (e) => {
    setTTN(e.target.value);
  };

  const handlePostcode = (e) => {
    setPostcode(e.target.value);
  };

  //validate Data
  const validateData = () => {
    var error = "";
    if (!email) {
      error += "please Enter Valid Email Address \n";
    } else {
      if (!IsValidEmail(email)) {
        error += "InValid Email Address";
      }
    }
    if (!FullName) {
      error += "please Enter Name \n";
    }
    if (!Age || Age < 0) {
      error += "please Enter Correct Age \n";
    }
    if (!Address) {
      error += "please Enter Address \n";
    }
    if (!Postcode) {
      error += "please Enter PostalCode \n";
    }
    if (!TTN) {
      error += "please Enter  TTN Code \n";
    }
    if (TTN && !validTTNCodes.filter((code) => code === TTN).length) {
      error += "Invalid TTN  Code\n";
    }
    if (!Result) {
      error += "Please select the Result";
    }
    return error;
  };

  const handleSubmit = () => {
    const error = validateData();
    if (error !== "") {
      alert(error);
    } else {
      Persist();
      setEmail(null);
      setFullName(null);
      setAge(null);
      setResult(null);
      setAddress(null);
      setPostcode(null);
      setTTN(null);
      history.replace("/home");
    }
  };

  return (
    <div>
      <form action="submit" className="home">
        <div className="home__first">
          <div className="home__left">
            <Input
              value={email}
              onChange={handleEmail}
              label="• Email"
              type="text"
            />
            <Input
              value={FullName}
              onChange={handleName}
              label="• Full Name"
              type="text"
            />
            <Input
              value={Age}
              onChange={handleAge}
              label="• Age"
              type="number"
              min={0}
            />
            <div className="result">
              <label>• Result :</label>
              <div className="result__buttons">
                <RadioButton label="POSITIVE" handleChange={handleResult} />
                <RadioButton label="NEGATIVE" handleChange={handleResult} />
                <RadioButton label="INCONCLUSIVE" handleChange={handleResult} />
              </div>
            </div>
          </div>
          <div className="home__right">
            <Input
              value={Address}
              onChange={handleAddress}
              label="• Address"
              type="text"
            />
            <Input
              value={Postcode}
              onChange={handlePostcode}
              label="• Postcode"
              type="text"
            />
            <Input
              value={TTN}
              onChange={handleTTNCode}
              label="• TTN Code"
              type="text"
            />
          </div>
        </div>
        <div className="home__bottom">
          <Button
            onClick={handleSubmit}
            onSubmit={handleSubmit}
            variant="outlined"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Home;
