# IoT-Sensor-App

This application comprises a complete pipeline from an IoT device, that sends sensor data via MQTT to google cloud and stores this data in Firebase Firestore database using pub/sub and cloud functions. A web application is subscribed to Firestore to receive real time updates as soon as the data is populated in the database using the onSnapshot method. The data is displayed in the form of a graph on the react frontend using the react-chartjs-2 library. The ‘NotifyDevice’ button on the dashboard triggers another cloud function using HTTP Trigger. This cloud function will be used to send a command to devices using IoT Core.
