var Transaction = require("../models/transactions");
var FutureTransaction = require("../models/futuretransactions");
const request = require('request');
const overview = require('./apiconfig/Overview.json');
const apiUrl = 'https://scanner.tradingview.com/crypto/scan';

let symbolName = "USDT";
let transactions;
function socketapi(io) {
  io.on('connection', (socket) => {
    if(transactions){
      io.emit("TransactionData", transactions);
    }
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });

    socket.on("changeSymbol", async (arg) => {
      symbolName = arg;
      
    });
  });

  setInterval(async () => {
    request.post(
      apiUrl,
      {json: overview},
      function (error, response, body){
        if (!error && response.statusCode == 200) {
          const obj = body;
          
          Object.keys(obj).forEach(function(key) {
            const data = obj[key];
            let cnt = 0;
            Object.keys(data).forEach(function(key1) {
              cnt ++;
            });
            console.log(cnt);
          });
        }
      }
    )
    io.emit("TransactionData", transactions);
  }, 10000);
}


module.exports = socketapi;