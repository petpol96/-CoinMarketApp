const express = require("express");
const router = express.Router();

const {
    getMarkets,
    getCoin
  } = require("../controllers/coins");

router.route("/market/:coinsPerPage/:page").get(getMarkets)
router.route('/:id').get(getCoin)

module.exports = router;