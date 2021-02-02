/*
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.deviceToFirestore = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, "base64").toString()
    : "Hi, This is Indrayani!";
  console.log(message);
  const iotdata = JSON.parse(message);

  //Save the sensor data to firestore
  const Firestore = require("@google-cloud/firestore");
  const db = new Firestore();

  async function testfirestore() {
    // Add a new document with a generated id.
    await db
      .collection("iot-sensor-data")
      .add({
        temperature: iotdata.temperature,
        humidity: iotdata.humidity,
        timecollected: iotdata.timecollected
      })
      .then(res => {
        console.log("Added doc with ID: ", res.id);
      });
  }
  testfirestore();
  console.log("Entered new data into the document");
};
