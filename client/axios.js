// import axios from "axios";
const axios = require("axios");
axios
  .get("http://localhost:8080/pollfgs")
  .then((res) => {
    console.log(res.data, res.status);
  })
  .catch(function (error) {
    console.log(error.response.status);
  });
