import React from 'react';
import Loader from 'react-loader-spinner';
import ShotChart from './ShotChart';
const axios = require('axios');


class Player extends React.Component {

    constructor() {
        super();
        this.state = {
            playerInfo: {},
            playerStats: [],
            playerPhoto: "",
            id: ""
        }
    }

    getInfo(ID) {
        axios.get(`/api/players/${ID}`)
        .then((results) => {
            this.setState({
                playerInfo: results.data.basics,
                playerStats: results.data.stats,
                playerPhoto: results.data.photo,
                id: ID
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    componentDidMount() {
        this.getInfo(this.props.match.params.playerID);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.match.params.playerID !== prevState.id){
            return {playerInfo: {}};
        } 
        else {
            return null;
        }
     }

    componentDidUpdate(nextProps) {
        if ((Object.keys(this.state.playerInfo).length === 0) && typeof(this.state.playerInfo) === "object") {
            this.getInfo(nextProps.match.params.playerID);
        }
    }

    render() {
        let seasonStats = [];
        if (this.state.playerStats.length !== 0){
            this.state.playerStats.forEach((year) => {
                seasonStats.push(
                    <tr key={year.season}>
                        <td>{year.season}</td>
                        <td>{year.team}</td>
                        <td>{year.GP}</td>
                        <td>{year.MIN}</td>
                        <td>{year.PTS}</td>
                        <td>{year.FGM}</td>
                        <td>{year.FGA}</td>
                        <td>{year.FG_PCT}</td>
                        <td>{year.FG3M}</td>
                        <td>{year.FG3A}</td>
                        <td>{year.FG3_PCT}</td>
                        <td>{year.FTM}</td>
                        <td>{year.FTA}</td>
                        <td>{year.FT_PCT}</td>
                        <td>{year.OREB}</td>
                        <td>{year.DREB}</td>
                        <td>{year.REB}</td>
                        <td>{year.AST}</td>
                        <td>{year.TOV}</td>
                        <td>{year.STL}</td>
                        <td>{year.BLK}</td>
                    </tr>);
            });
        }
        if (!(Object.keys(this.state.playerInfo).length === 0) && typeof(this.state.playerInfo) === "object") {
            return (
                <div className="player justify-content-center">
                    <div className="text-light player-overlay">
                        <div className="container center">
                            <div className="row">
                                <div className="col-lg-4 my-auto">
                                    <img width="10%" src={ this.state.playerPhoto } alt={this.state.playerInfo.firstName + " " +  this.state.playerInfo.lastName}></img>
                                </div>
                                <div className="col-8">
                                    <h1 className='display-3'>
                                        {this.state.playerInfo.firstName} {this.state.playerInfo.lastName}
                                    </h1>
                                    <h1><small className="display-4 text-muted">{this.state.playerInfo.position}</small></h1>
                                    <h3 className='display-4'>
                                        {this.state.playerInfo.team}
                                        <small className="text-muted"> - {this.state.playerInfo.number}</small>
                                    </h3>
                                    <div className="row">
                                        <div className="col-3">
                                            <div>Height: {this.state.playerInfo.height}</div>
                                            <div>Weight: {this.state.playerInfo.weight}</div>
                                        <div>Age: {this.state.playerInfo.age}</div>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h2>PPG</h2>
                                            <h3>{this.state.playerInfo.ppg}</h3>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h2>RPG</h2>
                                            <h3>{this.state.playerInfo.rpg}</h3>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h2>APG</h2>
                                            <h3>{this.state.playerInfo.apg}</h3>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid">
                                <h2>Per Game Stats</h2>
                                <div className="table-responsive">
                                    <table className="table table-striped table-dark table-hover" style={{fontSize: 14}}>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.playerStats.length === 0 ? null : seasonStats}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <ShotChart player={this.state.playerInfo.firstName + "%20" + this.state.playerInfo.lastName}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="player justify-content-center">
                    <div className="text-light">
                        <div className="container-fluid  dark-overlay center">
                            <Loader />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Player;
