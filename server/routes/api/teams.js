const axios = require('axios');
const express = require("express");
const router = express.Router();
const config = require("config");

// @routeGET    api/teams
// @desc        Test route
// @access      Public
router.get("/:teamKey", (req, res) => {
    axios({
        method: "GET",
        url: `https://api-nba-v1.p.rapidapi.com/teams/shortName/${req.params.teamKey}`,
        headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": config.get("RAPIDAPI_KEY"),
            useQueryString: true
        }
    })
    .then((teamData) => {
        axios({
            method: "GET",
            url: `https://api-nba-v1.p.rapidapi.com/players/teamId/${teamData.data.api.teams[0].teamId}`,
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                "x-rapidapi-key": config.get("RAPIDAPI_KEY"),
                useQueryString: true
            }
        })
        .then((playerData) => {
            let players = [];
            playerData.data.api.players.forEach((player) => {
                if (player.leagues.standard && player.leagues.standard.active === "1"){
                    players.push(player);
                }
            })
            res.send({
                team: teamData.data.api.teams[0],
                players: players
            });
        })
        .catch((playerError) => {
            console.log(playerError);
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;