const express = require("express");
const router = express.Router();
const axios = require("axios").default;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Insasa");
});

router.post("/", (req, res, next) => {
  try {
    const body = req.body;
    const config = {
      method: "post",
      url: "https://201.159.97.245:8500/api/dataapp/orden",
      headers: {
        Authorization: "Basic YXJpYmE6YXJpYmE=",
        "Content-Type": "application/xml",
      },
      data: body,
    };
    //console.log(config);
    axios(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
