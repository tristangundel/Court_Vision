import React from 'react';
import Loader from 'react-loader-spinner';
const axios = require('axios');

class Team extends React.Component {

    constructor() {
        super();
        this.state = {
            teamInfo: {},
            seasonRanks: {},
            playersInfo: [],
            logo: "",
            id: ""
        };
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(ID) {
        axios.get(`/api/teams/${ID}`)
        .then((results) => {
            this.setState({
                teamInfo: results.data.Info.TeamInfoCommon, 
                seasonRanks: results.data.Info.TeamSeasonRanks,
                playersInfo: results.data.Roster.CommonTeamRoster,
                logo: results.data.Logo,
                id: ID
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    componentDidMount() {
        this.getInfo(this.props.match.params.teamID);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.id !== nextProps.match.params.teamID) {
            this.getInfo(nextProps.match.params.teamID);
        }
    }

    render() {
        let roster = [];
        for (var key in this.state.playersInfo){
            roster.push((
                <tr key={this.state.playersInfo[key].PLAYER}>
                    <td>{this.state.playersInfo[key].PLAYER}</td>
                    <td>{this.state.playersInfo[key].NUM}</td>
                    <td>{this.state.playersInfo[key].POSITION}</td>
                    <td>{this.state.playersInfo[key].HEIGHT}</td>
                    <td>{this.state.playersInfo[key].WEIGHT}</td>
                    <td>{this.state.playersInfo[key].AGE}</td>
                    <td>{this.state.playersInfo[key].SCHOOL}</td>
                </tr>
            ))
        }
        if (!(Object.keys(this.state.teamInfo).length === 0) && typeof(this.state.teamInfo) === "object") {
            return (
                <div className="player justify-content-center">
                    <div className="text-light">
                        <div className="container  dark-overlay center">
                            <div className="row">
                                <div className="col-4">
                                    <img height='250px' src={ this.state.logo } alt={`${this.state.teamInfo.CITY} ${this.state.teamInfo.NICKNAME}`}></img>
                                </div>
                                <div className="col-8">
                                    <h1 className="display-1">
                                        {`${this.state.teamInfo.CITY} ${this.state.teamInfo.NICKNAME}`}
                                    </h1>
                                    <div className="row">
                                        <div className="col-3">
                                            <div>2019-20 Season </div>
                                            <div>{this.state.teamInfo.W}-{this.state.teamInfo.L} ({this.state.teamInfo.PCT})</div>
                                            <div>{this.state.teamInfo.CONF_RANK} in {this.state.teamInfo.TEAM_CONFERENCE}ern Conference</div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>PPG</h2>
                                            <h3>{this.state.seasonRanks.PTS_RANK}</h3>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>RPG</h2>
                                            <h3>{this.state.seasonRanks.REB_RANK}</h3>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>APG</h2>
                                            <h3>{this.state.seasonRanks.ASTPTS_RANK}</h3>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>OPG</h2>
                                            <h3>{this.state.seasonRanks.OPP_PTS_RANK}</h3>
                                        </div>   
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2>Team Roster</h2>
                                <table className="table table-striped table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Player</th>
                                            <th scope="col">#</th>
                                            <th scope="col">Pos</th>
                                            <th scope="col">Height</th>
                                            <th scope="col">Weight</th>
                                            <th scope="col">Age</th>
                                            <th scope="col">School</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.playersInfo.length === 0 ? null : roster}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(<Loader />);
        }
    }
}


export default Team;