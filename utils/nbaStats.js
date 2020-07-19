const axios = require('axios');

function generateURL(endpoint, parameters) {
    let url = `https://stats.nba.com/stats/${endpoint}?`;
    for (let key in parameters) {
        url += `${key}=${parameters[key]}&`;
    }
    return url;
}

function nbaGetData(endpoint, parameters) {
    return axios.get(
        generateURL(endpoint, parameters),
        {
            timeout: 10000,
            headers: {
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                'User-Agent': '',
                "Connection": "keep-alive",
                "x-nba-stats-origin":  "stats",
                "x-nba-stats-token": "true",
                "Referer": "https://stats.nba.com/",
                "Host": "stats.nba.com"
            }
        }
    );
}


module.exports = nbaGetData;
