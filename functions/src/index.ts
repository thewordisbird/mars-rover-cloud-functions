import functions = require("firebase-functions");
import express = require("express");

import nasa = require("./nasa");


// import * as cors from "cors";

// import cameras from "./cameras";


const app = express();

// Automatically allow cross-origin requests
// app.use(cors({origin: true}));

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.get("/hello", (req, resp) => {
  resp.send("Hello from Firebase via Express Newer");
});

app.post("/manifest", (req, res) => {
  console.log(req.body);
  nasa.getRoverManifest(req.body.rover_name)
      .then((manifest) => {
        console.log("manifest");
        res.send(manifest);
      });
});

// Expose Express API as a single
exports.widgets = functions.https.onRequest(app);
