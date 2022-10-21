const http = require("http");
const url = require("url");
const fs = require("fs");

const data = fs.readFileSync(__dirname + "/data/data.json");

const data2 = JSON.parse(JSON.stringify(data));
const server = http.createServer((req, res) => {
  const route = req.url;
  if (route === "/" || route === "home") {
    res.end("this is home page.");
  } else if (route === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.end("page not found");
  }
});

server.listen(8000, () => {
  console.log("server started at localhost:8000");
});
