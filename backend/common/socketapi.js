var Transaction = require("../models/transactions");
var FutureTransaction = require("../models/futuretransactions");

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
      if(symbolName == 'Future'){
        const tmpTransactions = await FutureTransaction.find({symbol: { $regex: 'USDT$' }}).sort({eventTime: -1});
        transactions = tmpTransactions;
      }
      else{
        const tmpTransactions = await Transaction.find({symbol: { $regex: symbolName + '$' }}).sort({eventTime: -1});
        transactions = tmpTransactions;
      }
      io.emit("TransactionData", transactions);
    });
  });

  setInterval(async () => {
    if(symbolName == 'Future'){
      const tmpTransactions = await FutureTransaction.find({symbol: { $regex: 'USDT$' }}).sort({eventTime: -1});
      transactions = tmpTransactions;
    }
    else{
      const tmpTransactions = await Transaction.find({symbol: { $regex: symbolName + '$' }}).sort({eventTime: -1});
      transactions = tmpTransactions;
    }
    io.emit("TransactionData", transactions);
  }, 20000);
}


module.exports = socketapi;