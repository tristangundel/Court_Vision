import axios from "axios";

export default {
  getData: () =>
    axios({
      method: "GET",
      url: "https://api-nba-v1.p.rapidapi.com/teams/city/Houston",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      },
      params: {
        search: "parameter",
      },
    }),
};
