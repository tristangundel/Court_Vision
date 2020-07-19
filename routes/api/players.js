const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');
const nbaGetData = require('../../utils/nbaStats');
const formatData = require('../../utils/formatData');

// @routeGET    api/players
// @desc        Test route
// @access      Public
router.get("/:playerID", (req, res) => {
    const regex = /%20/g;
    const ID = nba.getPlayerID(req.params.playerID.replace(regex, " ")).PlayerID;
    getPlayer(ID, res);

});

function getPlayerInfo(ID) {
    // return nba.playerInfo({PlayerID: ID});
    return nbaGetData('commonplayerinfo', {PlayerID: ID})
}

function getPlayerStats(ID) {
    // return nba.playerSplitsByYear({PlayerID: ID});
    let params = {
        "DateFrom": "",
            "DateTo": "",
            "GameSegment": "",
            "LastNGames": "0",
            "LeagueID": "00",
            "Location": "",
            "MeasureType": "Base",
            "Month": "0",
            "OpponentTeamID": "0",
            "Outcome": "",
            "PaceAdjust": "N",
            "Period": "0",
            "PerMode": "PerGame",
            "PlayerID": ID,
            "PlusMinus": "N",
            "PORound": "0",
            "Rank": "N",
            "Season": "2018-19",
            "SeasonSegment": "",
            "SeasonType": "Regular+Season",
            "ShotClockRange": "",
            "Split": "general",
            "VsConference": "",
            "VsDivision": ""
    };
    return nbaGetData('playerdashboardbyyearoveryear', params);
}

function getPlayer(ID, res) {
    getPlayerInfo(ID).then((infoData) => {
        if (infoData.data.resultSets){
            infoData = formatData(infoData.data);
        }
        getPlayerStats(ID).then((statData) => {
            if (statData.data.resultSets) {
                statData = formatData(statData.data);
            }
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