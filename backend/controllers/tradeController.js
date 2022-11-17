var Binance = require('binance-api-node').default;
module.exports = {
  balance: async (req, res) => {
    const { apiKey, secret } = req.user;
    const client = new Binance({
      apiKey : apiKey,
      apiSecret : secret,
      getTime: () => Date.now()
    });
    try{
      // client.futuresTrades({ symbol: 'ETHBTC' })
      // .then((response) => {
      //   return res.json({ status: true, data: {data : response}})
      // })
      // .catch((ex) => {
      //   return res.json({ status: false, data: {'ex': ex}})
      // })
      // client.order({
      //   symbol: 'XLMETH',
      //   side: 'BUY',
      //   quantity: '100',
      //   price: '0.0002',
      // }).then((res) => {
      //   console.log(res)
      // }).catch((ex) => {
      //   console.log(ex)
      // })

////////////////////////////////////////////////////////////
      let totalBalance = 0;
      client.futuresAccountBalance({'recvWindow': 10000000})
      .then((response) => {
        response.map(async (element) => {
          if(element.balance > 0){
            if(element.asset == 'USDT') {
              totalBalance += Number(element.balance);
            }
            else {
              client.futuresMarkPrice()
              .then((prices) => {
                prices.map((price) => {
                  if(price.symbol == (element.asset + 'USDT')) {
                    totalBalance = totalBalance + (Number(price.markPrice) * Number(element.balance))
                    console.log(totalBalance)
                  }
                });
              })
              .catch((ex) => console.log(ex));
            }
          }
        });
        return res.json({ status: true, message: "API Key Status Ok.", data: {Balance: totalBalance} });
      })
      .catch((ex) => {
        return res.json({ status: false, message: ex.message });
      })
    }
    catch(ex) {
      return res.json({ status: false, message: ex.message });
    }
  }
}