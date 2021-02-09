import React, { useEffect, useContext, useState } from "react";
import "../styles/Dashboard.css";
import { UserContext } from "../providers/UserProvider";
import { Redirect } from "react-router-dom";
import { logOut } from "../services/firebase";
import TempChart from "./TempChart";
import HumidityChart from "./HumidityChart";
import axios from "axios";

function sendCommand() {
  console.log("clicked");

  var body = {
    message: "Sending command to IoT device from react app."
  };

  axios
    .post(
      "https://us-central1-iotproject0923.cloudfunctions.net/notifyDevice",
      body
    )
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
function Dashboard() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (!user) {
      setredirect("/");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <div className="dashboard">
        <div>
          <TempChart />
          <br />
          <HumidityChart />
        </div>
        <br />
      </div>
      <button className="logout-button" onClick={sendCommand}>
        Notify Device
      </button>
      <button className="logout-button" onClick={logOut}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> Logout </span>
      </button>
    </div>
  );
}

export default Dashboard;
