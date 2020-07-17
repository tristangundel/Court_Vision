const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');
const teamKeys = require('../../utils/teamKeys');

// @routeGET    api/teams
// @desc        Test route
// @access      Public
router.get("/:teamKey", (req, res) => {
    getTeam(teamKeys, req.params.teamKey, res);
});

function getRoster(teamKeys, key) {
    return nba.teamRoster({TeamID: nba.getTeamID(teamKeys[key]).TeamID, Season: "2019-20"});
};

function getTeamInfo(teamKeys, key) {
    const TeamID = nba.getTeamID(teamKeys[key]).TeamID;
    // return nba.teamDetails({TeamID: nba.getTeamID(teamKeys[key]).TeamID})
    return axios.get(
        `https://stats.nba.com/stats/teaminfocommon?TeamID=${TeamID}`,
        {
            'Host': 'stats.nba.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://stats.nba.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'x-nba-stats-origin': 'stats',
            'x-nba-stats-token': 'true'
        }
    );
};

function getTeamLogo(key) {
    return nba.getTeamLogoURLs(key)[0];
}

function getTeam(teamKeys, key, res) {
    getRoster(teamKeys, key).then((rosterData) => {
        getTeamInfo(teamKeys, key).then((infoData) => {
            res.send({
                Roster: rosterData,
                Info: infoData,
                Logo: getTeamLogo(key)
            });
        })
        .catch((infoError) => console.log(infoError))
    })
    .catch((rosterError) => console.log(rosterError));
}

module.exports = router;