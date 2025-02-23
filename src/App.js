import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + "/tips.csv").then((data) => {
      data.forEach((d) => {
        d.total_bill = +d.total_bill;
        d.tip = +d.tip;
        d.day = d.day;
      });
      setData(data);
    });
  }, []);

  return (
    <div className="app">
      <h1>Tips Data Visualization</h1>
      <Child1 data={data} />
      <Child2 data={data} />
    </div>
  );
};

export default App;
