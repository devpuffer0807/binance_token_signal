var Binance = require('binance-api-node').default;
module.exports = {
  balance: async (req, res) => {
    const { apiKey, secret } = req.user;
    const client = new Binance({
      apiKey : 'AQeP1Fm1Z2wpZOk7H9WM4UvlkmBb4xX8AsN8vElRIMCE8ykPRQ98ki7JmhzJDH9U',
      apiSecret : '35V2VjJ33WtgWTjg42p34gjlsXFak6RUWEoLnP1IkOzj1tkvWdyzP7MFrBmy5nnf',
      getTime: () => Date.now()
    });
    try{
      console.log(await client.accountInfo({'recvWindow': 60000}))
      await client.futuresAccountBalance({'recvWindow': 10000000});
      return res.json({ status: true, message: "apiKey Ok" });
    }
    catch(ex) {
      console.log(ex);
      return res.json({ status: false, message: ex.message});
    }
  }
}