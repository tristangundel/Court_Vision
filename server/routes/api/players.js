const axios = require("axios");
const express = require("express");
const router = express.Router();
const config = require("config");

// @routeGET    api/players
// @desc        Test route
// @access      Public
router.get("/:playerId", (req, res) => {
    axios({
        method: "GET",
        url: `https://api-nba-v1.p.rapidapi.com/players/playerId/${req.params.playerId}`,
        headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": config.get("RAPIDAPI_KEY"),
            useQueryString: true
        }
    })
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;