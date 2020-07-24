import React from 'react';
import Loader from 'react-loader-spinner';
import ShotChart from './ShotChart';
const axios = require('axios');

function getAge(playerBirthday) {
    var today = new Date();
    var birthDate = new Date(playerBirthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

class Player extends React.Component {

    constructor() {
        super();
        this.state = {
            playerInfo: {},
            playerStats: {},
            playerPhoto: "",
            id: "",
            shots: {}
        }
    }

    getInfo(ID) {
        axios.get(`/api/players/${ID}`)
        .then((results) => {
            this.setState({
                playerInfo: results.data.Info.CommonPlayerInfo,
                playerStats: results.data.Stats.ByYearPlayerDashboard,
                playerPhoto: results.data.Picture,
                id: results.data.Info.CommonPlayerInfo.PERSON_ID,
                shots: results.data.Shots
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    componentDidMount() {
        this.getInfo(this.props.match.params.playerID);
    }

    render() {
        let seasonStats = [];
        for (var key in this.state.playerStats){
            seasonStats.push((
                <tr key={key}>
                    <td>{this.state.playerStats[key].GROUP_VALUE}</td>
                    <td>{this.state.playerStats[key].TEAM_ABBREVIATION}</td>
                    <td>{this.state.playerStats[key].GP}</td>
                    <td>{this.state.playerStats[key].MIN}</td>
                    <td>{this.state.playerStats[key].PTS}</td>
                    <td>{this.state.playerStats[key].FGM}</td>
                    <td>{this.state.playerStats[key].FGA}</td>
                    <td>{this.state.playerStats[key].FG_PCT}</td>
                    <td>{this.state.playerStats[key].FG3M}</td>
                    <td>{this.state.playerStats[key].FG3A}</td>
                    <td>{this.state.playerStats[key].FG3_PCT}</td>
                    <td>{this.state.playerStats[key].FTM}</td>
                    <td>{this.state.playerStats[key].FTA}</td>
                    <td>{this.state.playerStats[key].FT_PCT}</td>
                    <td>{this.state.playerStats[key].OREB}</td>
                    <td>{this.state.playerStats[key].DREB}</td>
                    <td>{this.state.playerStats[key].REB}</td>
                    <td>{this.state.playerStats[key].AST}</td>
                    <td>{this.state.playerStats[key].TOV}</td>
                    <td>{this.state.playerStats[key].STL}</td>
                    <td>{this.state.playerStats[key].BLK}</td>
                    <td>{this.state.playerStats[key].PLUS_MINUS}</td>
                </tr>
            ));
        }
        if (!(Object.keys(this.state.playerStats).length === 0) && typeof(this.state.playerStats) === "object") {
            return (
                <div className="player justify-content-center">
                    <div className="text-light">
                        <div className="container dark-overlay center">
                            <div className="row">
                                <div className="col-4">
                                    <img height='250px' src={ this.state.playerPhoto } alt={this.state.playerInfo.DISPLAY_FIRST_LAST}></img>
                                </div>
                                <div className="col-8">
                                    <h1 className='display-3'>
                                        {this.state.playerInfo.DISPLAY_FIRST_LAST}
                                        <small className="text-muted"> - {this.state.playerInfo.POSITION}</small>
                                    </h1>
                                    <h3 className='display-4'>
                                        {this.state.playerInfo.TEAM_CITY} {this.state.playerInfo.TEAM_NAME}
                                        <small className="text-muted"> - #{this.state.playerInfo.JERSEY}</small>
                                    </h3>
                                    <div className="row">
                                        <div className="col-3">
                                            <div>Height: {this.state.playerInfo.HEIGHT}</div>
                                            <div>Weight: {this.state.playerInfo.WEIGHT} lb</div>
                                        <div>Age: {getAge(this.state.playerInfo.BIRTHDATE)}</div>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h2>PPG</h2>
                                            <h3>{this.state.playerStats['0'].PTS}</h3>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h2>RPG</h2>
                                            <h3>{this.state.playerStats['0'].REB}</h3>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h2>APG</h2>
                                            <h3>{this.state.playerStats['0'].AST}</h3>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <h2>Per Game Stats</h2>
                                <div className="table-responsive">
                                    <table className="table table-striped table-dark table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Season</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">GP</th>
                                                <th scope="col">MIN</th>
                                                <th scope="col">PTS</th>
                                                <th scope="col">FGM</th>
                                                <th scope="col">FGA</th>
                                                <th scope="col">FG%</th>
                                                <th scope="col">3PM</th>
                                                <th scope="col">3PA</th>
                                                <th scope="col">3P%</th>
                                                <th scope="col">FTM</th>
                                                <th scope="col">FTA</th>
                                                <th scope="col">FT%</th>
                                                <th scope="col">OREB</th>
                                                <th scope="col">DREB</th>
                                                <th scope="col">REB</th>
                                                <th scope="col">AST</th>
                                                <th scope="col">TOV</th>
                                                <th scope="col">STL</th>
                                                <th scope="col">BLK</th>
                                                <th scope="col">+/-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.playerStats.length === 0 ? null : seasonStats}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="container">
                                <select className="form-control" style={{width: 200, margin:10}}>
                                    <option>2019-20 Season</option>
                                    <option>2018-19 Season</option>
                                    <option>Etc.</option>
                                </select>
                                <ShotChart
                                    shots={this.state.shots}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(<Loader />);
        }
    }
}

export default Player;
