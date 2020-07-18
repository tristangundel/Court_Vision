const express = require("express");
const router = express.Router();
const nba = require('nba-api-client');
const teamKeys = require('../../utils/teamKeys');
const axios = require('axios');

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
        `https://stats.nba.com/stats/teaminfocommon?TeamID=${TeamID}&LeagueID=00`,
        {
            headers: {
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
		"Connection": "keep-alive",
                "x-nba-stats-origin":  "stats",
                "x-nba-stats-token": "true",
                "Referer": "https://stats.nba.com/",
                "Host": "stats.nba.com"
            },
            timeout: 1000
        }

    );
};

function getTeamLogo(key) {
    return nba.getTeamLogoURLs(key)[0];
}

function getTeam(teamKeys, key, res) {
    getRoster(teamKeys, key)
        .then((rosterData) => {
            getTeamInfo(teamKeys, key)
                .then((infoData) => {

                    res.send({
                        Roster: rosterData,
                        Info: formatData(infoData.data, {formatted: true, parameters: false}),
                        Logo: getTeamLogo(key)
                    });
                })
                .catch((infoError) => {
                    console.log(infoError);
                    res.status(500);
                    res.send({Error: infoError.Error});
                });
        })
        .catch((rosterError) => {
            console.log(rosterError);
            res.status(500);
            res.send({Error: rosterError.Error});
        });
}

function formatData(json, options) {

	var data = {};
	var parameters = json.parameters;

	if(options.formatted){
		var result_set = json.resultSets;
		for(i in result_set){
			var merged = {};
			if(result_set[i].rowSet.length !== 1){
				var multipleRowSets = {};
				for(j in result_set[i].rowSet){
					var temp = {};
					for(k in result_set[i].headers){
						temp[result_set[i].headers[k]] = result_set[i].rowSet[j][k];
					}
					multipleRowSets[j] = temp;
				}
				data[result_set[i].name] = multipleRowSets;
			} else {
				for(j in result_set[i].headers){
					merged[result_set[i].headers[j]] = result_set[i].rowSet[0][j];
				}
				data[result_set[i].name] = merged;
			}
		}
	} else data = json;
	if (options.parameters) return {data, parameters};
	else return data;
}

module.exports = router;
