import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { RiBasketballLine } from 'react-icons/ri';
import { userLogout } from '../redux/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

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
    <NavDropdown.Item href={"/"+team.id} key={team.id}>{team.name}</NavDropdown.Item>
);

const wcTeamsDropdown = wcTeams.map(team =>
    <NavDropdown.Item href={"/"+team.id} key={team.id}>{team.name}</NavDropdown.Item>
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
            <Nav>
                <Nav.Link onClick={this.handleLogoutClick}>Logout</Nav.Link>
            </Nav>
        );
        // section of navbar to be seen by users who are not logged in
        const guestLinks = (
            <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        )

        return (
            <Navbar className="navbar-dark bg-dark" expand='md'>
                <Navbar.Brand href="/">
                    <RiBasketballLine size={36} className="d-inline-block align-top" />
                    CourtVision
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                    <Form inline>
                        <FormControl type="text" placeholder="Player Search" className="mr-sm-2" />
                    </Form>
                    <NavDropdown title="Teams">
                        <NavDropdown.Header>Eastern Conference</NavDropdown.Header>
                        {ecTeamsDropdown}
                        <NavDropdown.Divider />
                        <NavDropdown.Header>Western Conference</NavDropdown.Header>
                        {wcTeamsDropdown}
                    </NavDropdown>
                    <Nav.Link href='#LeagueLeaders'>League Leaders</Nav.Link>
                    </Nav>
                    {isAuthenticated ? loggedInLinks : guestLinks}
                </Navbar.Collapse>
            </Navbar>
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