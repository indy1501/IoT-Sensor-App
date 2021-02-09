IoT-Sensor-App

This application comprises a complete pipeline from an IoT device, that sends sensor data via MQTT to google cloud and stores this data in Firebase Firestore database using pub/sub and cloud functions. A web application is subscribed to Firestore to receive real time updates as soon as the data is populated in the database using the onSnapshot method. The data is displayed in the form of a graph on the react frontend using the react-chartjs-2 library. The ‘NotifyDevice’ button on the dashboard triggers another cloud function using HTTP Trigger. This cloud function will be used to send a command to devices using IoT Core.

# Google Sign: React + Firebase

Set up google authentication using firebase and use the Context API to access the user's authentication status so as to prevent unauthorised access to protected routes

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
