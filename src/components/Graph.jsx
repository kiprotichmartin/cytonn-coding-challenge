import React, { useState, useEffect } from "react";
import "./Graph.css";
// import { fetchDailyData } from "./Data";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default function Graph() {
  const [dailyData, setDailyData] = useState(null);

  const fetchApi = async () =>
    await axios({
      method: "GET",
      url: "https://covid-193.p.rapidapi.com/history",
      params: { country: "kenya", day: "2022-11-03" },
      headers: {
        "X-RapidAPI-Key": "8507ff7c6dmsh12774031e3cecd1p19854cjsnadd35c1d9235",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    })
      .then(function (response) {
        setDailyData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });

  useEffect(() => {
    fetchApi();
  }, []);

  console.log(dailyData);

  const lineChart = dailyData ? (
    <Line
      data={{
        labels: dailyData.map((data) => data.time),
        // labels: [
        //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        //   21, 22, 23, 24,
        // ],
        datasets: [
          {
            data: dailyData.map((data) => data.cases.total),
            label: "Total Cases",
            borderColor: "blue",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths.total),
            label: "Total Deaths",
            borderColor: "red",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.tests.total),
            label: "Total Tests",
            borderColor: "green",
            // backgroundColor: "rgb(255, 0, 0)",
            fill: true,
          },
        ],
      }}
    />
  ) : (
    <h1>Try restarting the page</h1>
  );

  return (
    <div className="chart-container">
      <h3 className="chart-title">Line Chart for Kenya on 03-11-2022</h3>
      {lineChart}
    </div>
  );
}
