# Court_Vision

Court Vision is a web based application for users to see statistics about their favorite players in the NBA with easy to follow visualizations. Basketball data will be scraped via the stats.nba.com API and dynamically displayed to the user. Users will be able to make informed decisions in fantasy leagues as well as wagers. (Oregon State University - CS467 Capstone Project)

Server runs at port 5000, client runs at port 3000. \
To start: \
run "npm install" in client directory \
run "npm run dev" in root directory to run both server and client

With "npm run dev"" and nodemon set to run it will refresh automatically as you make updates and save changes!

Tools used within project:

- node.js
- MongoDB (MongoDB Atlas used here)
- mongoose - allows modeling of data
- Express.js
- React.js
- GitHub - version control
- bcyrptjs - used for password encryption
- postman - to test requests
- react dev tools
- redux dev tools

Dependencies used:

- express-validator
- bcryptjs
- config - for global variables
- jsonwebtoken - allows token for validation
- mongoose - allows interaction with database
- request - allows HTTP request with other APIs
- axios - to make HTTP request
- moment - date and time library
- react-moment - allows us to use moment within react component
- cypress - integration testing

Dev Dependencies:

- nodemon - watches server to refresh as we update
- concurrently - can see run backend and frontend on one single command
- redux-devtools-extensions - makes it easier to use redux

NBA stats API:

- [nba-api-client](https://www.npmjs.com/package/nba-api-client)
