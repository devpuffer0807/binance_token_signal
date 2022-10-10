var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var formData = require("express-form-data");
var os = require("os");

require("dotenv").config();
require("./common/db");

// var Binance = require("node-binance-api");
var Binance = require("binance-api-node").default;
var Transaction = require("./models/transactions");

var apiRoutes = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  formData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true,
  })
);

/**
 * Server Routing configuration
 */

app.use("/", apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");

  console.log(err);
});

// const binance = new Binance().options({
//   APIKEY: "AQeP1Fm1Z2wpZOk7H9WM4UvlkmBb4xX8AsN8vElRIMCE8ykPRQ98ki7JmhzJDH9U",
//   APISECRET: "35V2VjJ33WtgWTjg42p34gjlsXFak6RUWEoLnP1IkOzj1tkvWdyzP7MFrBmy5nnf",
// });

// binance.futuresMiniTickerStream("BTCUSDT", console.log);

const client = Binance({
  apiKey: "AQeP1Fm1Z2wpZOk7H9WM4UvlkmBb4xX8AsN8vElRIMCE8ykPRQ98ki7JmhzJDH9U",
  apiSecret: "35V2VjJ33WtgWTjg42p34gjlsXFak6RUWEoLnP1IkOzj1tkvWdyzP7MFrBmy5nnf",
  getTime: 60,
});

client.ws.futuresAllTickers((tickers) => {
  tickers.map(async (ticker) => {
    const transaction = new Transaction(ticker);
    await Transaction.create(transaction);
  });
});

module.exports = app;
