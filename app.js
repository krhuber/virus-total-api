const https = require("node:https");
const apiKey = process.env.API_KEY;

const options = {
  headers: {
    "x-apikey": apiKey,
    "Content-Type": "application/json",
  },
};

https
  .get(
    "https://virustotal.com/api/v3/domains/google.com",
    options,
    (response) => {
      const { statusCode } = response;

      response.setEncoding("utf8");
      let rawData = "";
      response.on("data", (chunk) => {
        rawData += chunk;
      });
      response.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    }
  )
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
