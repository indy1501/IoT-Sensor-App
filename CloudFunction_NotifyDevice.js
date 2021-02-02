const iot = require("@google-cloud/iot");

exports.notifyDevice = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    console.log("!OPTIONS");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "86400");
    res.status(204).send("");
  } else {
    try {
      if (req.method !== "POST") {
        console.log("Send a POST request");
      }
      console.log("request body: ", req.body);
      let message =
        req.query.message || req.body.message || "from cloud function";
      if (!message || message.length === 0) {
        console.log("message missing in request body.");
      }

      const commandMessage = "Indy message";
      const dataToSend = {
        deviceId: "indrayani-iot-device",
        commandMessage: "message received from react app",
        projectId: "iotproject0923",
        registryId: "Indrayani-IoT-Registry",
        cloudRegion: "us-central1"
      };
      console.log("message: ", commandMessage);
      const response = await sendMessage(dataToSend);

      res.status(200).json(response);
    } catch (err) {
      console.log("error", err.message);
      res.status(400).json({
        error: err.message
      });
    }
  }
};

const sendMessage = async ({
  deviceId,
  registryId,
  projectId,
  cloudRegion,
  commandMessage
}) => {
  const iotClient = new iot.v1.DeviceManagerClient();
  const formattedName = iotClient.devicePath(
    projectId,
    cloudRegion,
    registryId,
    deviceId
  );

  const binaryData = Buffer.from(commandMessage);
  const request = {
    name: formattedName,
    binaryData: binaryData
  };
  console.log("request data: ", request);
  try {
    const responses = await iotClient.sendCommandToDevice(request);
    console.log("Sent command: ", responses[0]);
  } catch (err) {
    console.error("Could not send command: ", err);
  }
};
