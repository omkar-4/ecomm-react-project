const fbAdmin = require("firebase-admin");
const serviceCredentials = require("ecomm-react-project-firebase-adminsdk.json");

fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceCredentials),
  storageBucket: "ecomm-react-project.appspot.com",
});

module.exports = fbAdmin;
