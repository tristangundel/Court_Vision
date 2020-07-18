const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');

// @routeGET    api/players
// @desc        Test route
// @access      Public
router.get("/:playerID", (req, res) => {
    const regex = /%20/g;
    const ID = nba.getPlayerID(req.params.playerID.replace(regex, " ")).PlayerID;
    getPlayer(ID, res);

});

function getPlayerInfo(ID) {
    return nba.playerInfo({PlayerID: ID});
}

function getPlayerStats(ID) {
    return nba.playerSplitsByYear({PlayerID: ID});
}

function getPlayer(ID, res) {
    getPlayerInfo(ID).then((infoData) => {
        getPlayerStats(ID).then((statData) => {
            res.send({
                Info: infoData,
                Stats: statData,
                Picture: nba.getPlayerHeadshotURL({PlayerID: ID, TeamID: infoData.CommonPlayerInfo.TEAM_ID})
            });
        })
        .catch((statError) => {
            console.log(statError);
        });
    })
    .catch((infoError) => {
        console.log(infoError);
    });
}

module.exports = router;