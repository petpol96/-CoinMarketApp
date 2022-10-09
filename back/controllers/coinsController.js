const baseUrl = "https://api.coingecko.com/api/v3/coins/";
const axios = require("axios");
const services = require('../services/coinService')

const getMarkets = async (req, res) => {
  try {
    let markets= await services.marketService(req.params.coinsPerPage,req.params.page)
    res.header("Access-Control-Allow-Origin", "*")
    res.status(200).json({ markets:markets});
  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*")
    res.status(500).json({ msg: error });
  }
};

const getCoin = async (req, res) => {
  try {
      let coinInfo =await services.coinIdService(req.params.id)
      res.header("Access-Control-Allow-Origin", "*")
      res.status(200).json(coinInfo)
  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*")
    res.status(500).json({ msg: error});
  }
};
module.exports = {
    getCoin,
  getMarkets,
};
