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




var Transaction = require("./models/transactions");
var FutureTransaction = require("./models/futuretransactions");

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

// app.io = require('socket.io')();
// const socketapi = {
//     io: app.io
// };

// require('./common/socketapi')(app.io);



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

// var Binance = require("binance-api-node").default;
// const client = Binance({
//   apiKey: "AQeP1Fm1Z2wpZOk7H9WM4UvlkmBb4xX8AsN8vElRIMCE8ykPRQ98ki7JmhzJDH9U",
//   apiSecret: "35V2VjJ33WtgWTjg42p34gjlsXFak6RUWEoLnP1IkOzj1tkvWdyzP7MFrBmy5nnf",
//   getTime: 60,
// });
// let previousData = [];
// client.ws.allTickers(async (tickers) => {
//     tickers.map(async (ticker) => {
//       let tickerEvent = ticker.eventTime.toString().substring(0, 7);
//       if(!previousData[ticker.symbol]){
//         previousData[ticker.symbol] = { lasttime: tickerEvent };
//         tickerEvent = '^' + tickerEvent;
//         const aggregateVal = [
//           {
//             '$match': {
//               'symbol': ticker.symbol
//             }
//           }, {
//             '$addFields': {
//               'convertedTime': {
//                 '$toString': {
//                   '$toLong': '$eventTime'
//                 },
//               },        
//             }
//           }, {
//             '$match': {
//               'convertedTime': {
//                 '$regex': tickerEvent
//               }
//             }
//           },
//         ];
//         const existTransaction = await Transaction.aggregate(aggregateVal);
//         if(existTransaction.length == 0){
//           await Transaction.create(ticker);
//         }
//       }
//       else {
//         if(previousData[ticker.symbol].lasttime != tickerEvent){
//           previousData[ticker.symbol].lasttime = tickerEvent;
//           await Transaction.create(ticker);
//         }
//       }
//     });
// });

// let previousFutureData = [];
// client.ws.futuresAllTickers(async (tickers) => {
//     tickers.map(async (ticker) => {
//       let tickerEvent = ticker.eventTime.toString().substring(0, 7);
//       if(!previousFutureData[ticker.symbol]){
//         previousFutureData[ticker.symbol] = { lasttime: tickerEvent };
//         tickerEvent = '^' + tickerEvent;
//         const aggregateVal = [
//           {
//             '$match': {
//               'symbol': ticker.symbol
//             }
//           }, {
//             '$addFields': {
//               'convertedTime': {
//                 '$toString': {
//                   '$toLong': '$eventTime'
//                 },
//               },        
//             }
//           }, {
//             '$match': {
//               'convertedTime': {
//                 '$regex': tickerEvent
//               }
//             }
//           },
//         ];
//         const existTransaction = await FutureTransaction.aggregate(aggregateVal);
//         if(existTransaction.length == 0){
//           await FutureTransaction.create(ticker);
//         }
//       }
//       else {
//         if(previousFutureData[ticker.symbol].lasttime != tickerEvent){
//           previousFutureData[ticker.symbol].lasttime = tickerEvent;
//           await FutureTransaction.create(ticker);
//         }
//       }
//     });
// });


// const Binance = require('node-binance-api');
// const { Console } = require("console");
// const binance = new Binance().options({
//   APIKEY: 'AQeP1Fm1Z2wpZOk7H9WM4UvlkmBb4xX8AsN8vElRIMCE8ykPRQ98ki7JmhzJDH9U',
//   APISECRET: '35V2VjJ33WtgWTjg42p34gjlsXFak6RUWEoLnP1IkOzj1tkvWdyzP7MFrBmy5nnf'
// });
// binance.futuresAggTradeStream( 'ETHUSDT', (res) => {
//   console.log(res.amount)
// } );

//current prices with symbol
// binance.futuresPrices().then((res) => console.log(res))



module.exports = app;
