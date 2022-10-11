var Transaction = require("../models/transactions");

let symbolName = "USDT";
let pageSize = 200;
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

    socket.on("changeSymbol", (arg) => {
      symbolName = arg;
    });
  });

  setInterval(async () => {
    const tmpTransactions = await Transaction.find({symbol: { $regex: symbolName + '$' }}).sort({eventTime: -1}).limit(pageSize);
    transactions = tmpTransactions;
    io.emit("TransactionData", transactions);
  }, 5000);
}


module.exports = socketapi;