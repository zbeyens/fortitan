const express = require("express"),
  app = express(),
  path = require("path"),
  bodyParser = require("body-parser"),
  // favicon = require("serve-favicon"),
  logger = require("morgan"),
  helmet = require("helmet");

const Routes = require("./routes/routes.js");
const cfg = require("./config");

const publicPath = path.join(__dirname, "../client");
const sharedPath = path.join(__dirname, "../shared");

// app.use(favicon(path.join(publicPath, "/src/img/icons/icon-32.png")));
app.use(bodyParser.json()); //support json-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //support url-encoded bodies

//for development hot reloading
const env = process.env.NODE_ENV || "development";
console.log("Node env: " + env);
if (env === "development") {
  app.use("/", express.static(path.join(publicPath, "/src")));
  app.use("/dist", express.static(path.join(publicPath, "/dist")));

  app.use(logger("dev"));
} else if (env === "production") {
  app.use(
    "/",
    express.static(path.join(publicPath, "/src"), {
      maxAge: "1h"
    })
  );
  app.use(
    "/dist",
    express.static(path.join(publicPath, "/dist"), {
      maxAge: "1h"
    })
  );

  app.use(
    helmet({
      frameguard: false
    })
  ); //protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
}

const routes = new Routes();
routes.init(app);

app.listen(cfg.server.clientPort, () => {
  console.info("Listening to port", cfg.server.clientPort);
});
