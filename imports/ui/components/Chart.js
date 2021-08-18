import React from "react";
import { Chart } from "react-google-charts";

export const LineChart = ({ currencies, rate }) => {
  const data = [["x", "values"]];
  currencies.forEach((register, i) =>
    data.push([register.createdAt.getDate(), register.rates[rate]])
  );

  return (
    <Chart
      width={"300px"}
      heigth={"300px"}
      chartType={"LineChart"}
      loader={<div>Loading...</div>}
      data={data}
      options={{
        hAxis: {
          title: "Day",
        },
        vAxis: {
          title: "Price",
        },
        backgroundColor: "#dedcdc",
        colors: ["green"],
      }}
      rootProps={{ "data-testid": "1" }}
    ></Chart>
  );
};
