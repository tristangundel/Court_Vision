import React from 'react';
import Loader from 'react-loader-spinner';
const axios = require('axios');

class Team extends React.Component {

    constructor() {
        super();
        this.state = {
            teamInfo: {},
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
                teamInfo: results.data.Info.TeamBackground, 
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
        this.getInfo(this.props.match.params.teamId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.id !== nextProps.match.params.teamId) {
            this.getInfo(nextProps.match.params.teamId);
        }
    }

    render() {
        let roster = [];
        for (var key in this.state.playersInfo){
            roster.push((
                <tr key={this.state.playersInfo[key].PLAYER}>
                    <td scope="row">{this.state.playersInfo[key].PLAYER}</td>
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
                                    <img height='250px' src={ this.state.logo }></img>
                                </div>
                                <div className="col-8">
                                    <h1 className="display-1">
                                        {`${this.state.teamInfo.CITY} ${this.state.teamInfo.NICKNAME}`}
                                    </h1>
                                    <div className="row">
                                        <div className="col-3">
                                            <div>2019-20 Season </div>
                                            <div>20-47 (.299)</div>
                                            <div>14th in Eastern Conf</div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>PPG</h2>
                                            <h3>16th</h3>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>RPG</h2>
                                            <h3>21st</h3>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>APG</h2>
                                            <h3>18th</h3>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h2>OPG</h2>
                                            <h3>30th</h3>
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