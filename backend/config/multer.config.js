const FirebaseStorage = require("multer-firebase-storage");
const fbAdmin = require("./firebase.config");
const serviceCredentials = require("./ecomm-react-project-firebase-adminsdk.json");
const multer = require("multer");

const storage = FirebaseStorage({
  bucketName: "ecomm-react-project.appspot.com",
  credentials: fb.Admin.credentials(serviceCredentials),
  unique: true,
  public: true,
});

const upload = multer({ storage: storage });

module.exports = upload;
