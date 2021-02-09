import React from "react";
import { Line } from "react-chartjs-2";
import { useIoTData } from "./TempChart";

function HumidityChart() {
  const iotData = useIoTData();
  let humidityArr = [];
  let timeArr = [];
  let timeSeries = [];
  iotData.map(d => {
    humidityArr.push(d.humidity);
    timeSeries = new Date(d.timecollected).toLocaleTimeString();
    timeArr.push(timeSeries);
  });

  const data = {
    labels: timeArr,
    datasets: [
      {
        label: "Humidity in percentage",
        data: humidityArr,
        backgroundColor: ["rgba(54,162,235,0.2)"],
        borderColor: ["rgba(54,162,235,0.2)"],
        pointbackgroundColor: "rgba(54,162,235,0.2)",
        pointborderColor: "rgba(54,162,235,0.2)",
        borderWidth: 3
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 20,
            max: 100,
            stepSize: 10
          }
        }
      ]
    }
  };
  return <Line data={data} width={1500} height={325} options={options} />;
}

export default HumidityChart;
