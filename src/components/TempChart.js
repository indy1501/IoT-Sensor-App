import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { firestore } from "../services/firebase";

export function useIoTData() {
  const [iotData, setIoTData] = useState([]);

  useEffect(() => {
    firestore
      .collection("iot-sensor-data")
      .orderBy("timecollected")
      .onSnapshot(snapshot => {
        // debugger;
        const newIoTData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setIoTData(newIoTData);
      });
  }, []);

  return iotData;
}

function TempChart() {
  const iotData = useIoTData();
  let tempArr = [];
  let timeArr = [];
  let timeSeries = [];
  iotData.map(d => {
    tempArr.push(d.temperature);
    timeSeries = new Date(d.timecollected).toLocaleTimeString();
    timeArr.push(timeSeries);
  });

  const currentData = {
    labels: timeArr,

    datasets: [
      {
        label: "Temperature in celcius",
        data: tempArr,

        backgroundColor: ["rgba(245,206,86,0.2)"],
        borderColor: ["rgba(255,206,86,0.2)"],
        pointbackgroundColor: "rgba(245,206,86,0.2)",
        pointborderColor: "rgba(255,206,86,0.2)",
        borderWidth: 3
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 15,
            max: 48,
            stepSize: 3
          }
        }
      ]
    }
  };

  return (
    <Line data={currentData} width={1500} height={325} options={options} />
  );
}

export default TempChart;
