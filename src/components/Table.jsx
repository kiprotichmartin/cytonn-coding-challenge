import React, { useState } from "react";
import "./Table.css";
import axios from "axios";

export default function Table() {
  const [statData, setStatData] = useState([]);
  const [search, setSearch] = useState("");

  const options = {
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/statistics",
    headers: {
      "X-RapidAPI-Key": "8507ff7c6dmsh12774031e3cecd1p19854cjsnadd35c1d9235",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      setStatData(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="table-container">
      <div className="search-input-container">
        <label className="search-input-label" htmlFor="search-input">SEARCH</label>
        <input
          onChange={handleChange}
          type="text"
          name="search-input"
          id="search-input"
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr className="table-columns">
            <th>Continent</th>
            <th>Country</th>
            <th>Population</th>
            <th>Total Cases</th>
            <th>Total Deaths</th>
            <th>Total Tests</th>
          </tr>
        </thead>
        <tbody>
          {statData
            .filter((data) => {
              if (search === "") {
                return data;
              } else if (
                data.country.toLowerCase().includes(search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data, index) => {
              return (
                <tr key={index} className="table-rows">
                  <td>{data.continent}</td>
                  <td>{data.country}</td>
                  <td>{data.population}</td>
                  <td>{data.cases.total}</td>
                  <td>{data.deaths.total}</td>
                  <td>{data.tests.total}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
