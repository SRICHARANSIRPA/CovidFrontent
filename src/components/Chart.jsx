import React, { useState, useEffect } from "react";
import { Pie, defaults, Line, Bar, Doughnut } from "react-chartjs-2";
import axios from "../middlewares/axios";
import Cookies, { set } from "js-cookie";
import AdminHeader from "./AdminHeader";
import _ from "lodash";
import groupBy from "../Util/chartDataHelper";
// defaults.global.tooltips.enabled = false;
defaults.global.legend.position = "bottom";

const Chart = ({ setUser }) => {
  const [Data, setData] = useState([]);
  const [positive, setPositive] = useState(null);
  const [negative, setNegative] = useState(null);
  const [inconclusive, setInconclusive] = useState(null);
  useEffect(() => {
    getDataToDisplay();
  }, []);

  const getDataToDisplay = () => {
    //API  CALL
    const header = {
      "x-auth-token": Cookies.get("x-auth-token"),
    };
    axios
      .get("/api/covidData", { headers: header })
      .then(({ data: data }) => {
        const result = data.data;
        setData(result);
        console.log(result);
        debugger;
        const res = result.filter((x) => x.Result === "POSITIVE");
        setPositive(res.length);
        const res2 = result.filter((x) => x.Result === "NEGATIVE");
        setNegative(res2.length);
        const res3 = result.filter((x) => x.Result === "INCONCLUSIVE");
        setInconclusive(res3.length);
      })
      .catch((err) => {
        alert("somthing Failed");
      });
  };
  return (
    <div className="Chart">
      <AdminHeader setUser={setUser} />
      {Data ? (
        <div className="chart__bottom">
          <Bar
            data={{
              labels: [" # POSITIVE", "# Negative", "# Inconclusive"],
              datasets: [
                {
                  label: " # POSITIVE",
                  data: [Array().fill(), positive],
                  backgroundColor: "red",
                  borderColor: "white",
                  borderWidth: 1,
                },
                {
                  label: "# Negative",
                  data: [Array().fill(), negative],
                  backgroundColor: "green",
                  borderColor: "green",
                },
                {
                  label: "# Inconclusive",
                  data: [Array().fill(), inconclusive],
                  backgroundColor: "blue",
                  borderColor: "blue",
                },
              ],
            }}
            height={400}
            width={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 25,
                },
              },
            }}
          />
        </div>
      ) : (
        <h2>No data found</h2>
      )}
    </div>
  );
};

export default Chart;
