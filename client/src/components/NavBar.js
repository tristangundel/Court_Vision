import React from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
// import { RiBasketballLine } from 'react-icons/ri';
import { userLogout } from '../redux/actions/authActions';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const playerList = require('../utils/playerList');

const ecTeams = [
    { name: 'Atlanta Hawks', id: 'ATL' },
    { name: 'Boston Celtics', id: 'BOS' },
    { name: 'Brooklyn Nets', id: 'BKN'},
    { name: 'Charlotte Hornets', id: 'CHA'},
    { name: 'Chicago Bulls', id: 'CHI'},
    { name: 'Cleveland Cavaliers', id: 'CLE'},
    { name: 'Detroit Pistons', id: 'DET'},
    { name: 'Indiana Pacers', id: 'IND'},
    { name: 'Miami Heat', id: 'MIA'},
    { name: 'Milwaukee Bucks', id: 'MIL'},
    { name: 'New York Knicks', id: 'NYN'},
    { name: 'Orlando Magic', id: 'ORL'},
    { name: 'Philadelphia 76ers', id: 'PHI'},
    { name: 'Toronto Raptors', id: 'TOR'},
    { name: 'Washington Wizards', id: 'WAS'}
]

const wcTeams = [
    { name: 'Dallas Mavericks', id: 'DAL' },
    { name: 'Denver Nuggets', id: 'DEN' },
    { name: 'Golden State Warriors', id: 'GSW'},
    { name: 'Houston Rockets', id: 'HOU'},
    { name: 'Los Angeles Clippers', id: 'LAC'},
    { name: 'Los Angeles Lakers', id: 'LAL'},
    { name: 'Memphis Grizzlies', id: 'MEM'},
    { name: 'Minnesota Timberwolves', id: 'MIN'},
    { name: 'New Orleans Pelicans', id: 'NOP'},
    { name: 'Oklahoma City Thunder', id: 'OKC'},
    { name: 'Phoenix Suns', id: 'PHX'},
    { name: 'Portland Trail Blazers', id: 'POR'},
    { name: 'Sacramento Kings', id: 'SAC'},
    { name: 'San Antonio Spurs', id: 'SAS'},
    { name: 'Utah Jazz', id: 'UTA'}
];

const ecTeamsDropdown = ecTeams.map((team) =>
    <Link className="dropdown-item" to={"/team/"+ team.id} key={team.id}>{team.name}</Link>
);

const wcTeamsDropdown = wcTeams.map(team =>
    <Link className="dropdown-item" to={"/team/" + team.id} key={team.id}>{team.name}</Link>
);

class NavBar extends React.Component {
    constructor() {
        super();
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    // handles function when user clicks on logout
    handleLogoutClick(event) {
        event.preventDefault();
        this.props.userLogout(this.props.history);
    }

    render() {
        // retrieve whether or not user is logged in
        const { isAuthenticated } = this.props.auth;
        
        // section of navbar to be seen by users who are logged in
        const loggedInLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Nav.Link onClick={this.handleLogoutClick}>Logout</Nav.Link>
                </li>
            </ul>
            
            
        );
        // section of navbar to be seen by users who are not logged in
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );
              
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div className="container"> 
                    <i className="fas fa-basketball-ball text-light fa-2x mr-2"></i>
                    <Link className="navbar-brand" to="/">CourtVision</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            {/* <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Player Search" aria-label="Search"></input>
                            </form> */}
                            <SearchBar options={playerList}/>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Teams
                                </div>
                                <div className='dropdown-menu' aria-labelledby="navbarDropdownMenuLink">
                                    {ecTeamsDropdown}
                                    {wcTeamsDropdown}
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/leagueleaders">League Leaders</Link>
                            </li>
                        </ul>
                        {isAuthenticated ? loggedInLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}
NavBar.propTypes = {
    userLogout: PropTypes.func.isRequired,
    auth: PropTypes.object
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { userLogout })(withRouter(NavBar) );