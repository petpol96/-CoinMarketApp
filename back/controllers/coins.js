const baseUrl = "https://api.coingecko.com/api/v3/coins/";
const axios = require("axios");

const getMarkets = async (req, res) => {
  try {
    let response = await axios
      .get(baseUrl + "markets", {
        params: {
          vs_currency: "usd",
          per_page:req.params.coinsPerPage,
          page:req.params.page,
          sparkline: false,
        },
        
      })
      .catch((error) => {
        console.log(error);
      });
    response =response.data.map(x=> ({
        'name':x.name,
        'image':x.image,
        'id':x.id,
        'symbol':x.symbol,
        "current_price":x.current_price,
        'high_24h':x.high_24h,
        'low_24h':x.high_24h,
        'price_change_percentage_24h':x.price_change_percentage_24h

    }))
    res.header("Access-Control-Allow-Origin", "*")
    res.status(200).json({ markets:response});
  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*")
    res.status(500).json({ msg: error });
  }
};

const getCoin = async (req, res) => {
  try {
    let response = await axios
      .get(baseUrl + req.params.id, {
        params: {
          vs_currency: "usd",
          per_page: 20,
          page: 1,
          sparkline: false,
        },
      })
      .catch((error) => {
        console.log(error);
      });
      response={
        'id':response.data.id,
        'symbol':response.data.symbol,
        'name':response.data.name,
        'current_price':response.data.market_data.current_price.usd,
        'description':response.data.description.en,
        'high_24h':response.data.market_data.high_24h.usd,
        'low_24h':response.data.market_data.low_24h.usd,
        "price_change_percentage_24h": response.data.market_data.price_change_percentage_24h,
        "price_change_percentage_7d": response.data.market_data.price_change_percentage_7d,
        "price_change_percentage_14d": response.data.market_data.price_change_percentage_14d,
        "price_change_percentage_30d": response.data.market_data.price_change_percentage_30d,
        "price_change_percentage_60d": response.data.market_data.price_change_percentage_60d,
        "price_change_percentage_200d": response.data.market_data.price_change_percentage_200d,
        "price_change_percentage_1y": response.data.market_data.price_change_percentage_1y,

    } 
      res.header("Access-Control-Allow-Origin", "*")
      res.status(200).json(response)
  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*")
    res.status(500).json({ msg: error});
  }
};
module.exports = {
    getCoin,
  getMarkets,
};
