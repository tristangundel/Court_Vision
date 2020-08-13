import React from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
const axios = require('axios');

const getRank = (rank) => {
    if (rank >= 10 && rank <= 20) {
        return `${rank}th`;
    }
    const digit = rank%10;
    switch(digit) {
        case 1:
            return `${rank}st`;
        case 2:
            return `${rank}nd`;
        case 3:
            return `${rank}rd`;
        default:
            return `${rank}th`;
    }
}

class Team extends React.Component {

    constructor() {
        super();
        this.state = {
            stats: {},
            standings: {},
            roster: [],
            logo: "",
            id: ""
        };
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(ID) {
        axios.get(`/api/teams/${ID}`)
        .then((results) => {
            this.setState({
                stats: results.data.Stats, 
                standings: results.data.Standings,
                roster: results.data.Roster,
                logo: results.data.Logo,
                id: ID
            });
            // console.log(this.state.teamInfo);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    componentDidMount() {
        this.getInfo(this.props.match.params.teamID);

    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.match.params.teamID !== prevState.id){
            return {stats: {}};
        } 
        else {
            return null;
        }
     }

    componentDidUpdate(nextProps) {
        if ((Object.keys(this.state.stats).length === 0) && typeof(this.state.stats) === "object") {
            this.getInfo(nextProps.match.params.teamID);
        }
    }
    
    render() {
        let roster = [];
        for (let i = 0; i < this.state.roster.length; i++){
            roster.push((
                <tr key={this.state.roster[i].name}>
                    <td>
                        <Link 
                            to={`/player/${this.state.roster[i].name}`} 
                            style={{textDecoration: "none", color: "white"}}
                            >{this.state.roster[i].name}
                        </Link>
                    </td>
                    <td>{this.state.roster[i].number}</td>
                    <td>{this.state.roster[i].position}</td>
                    <td>{this.state.roster[i].height}</td>
                    <td>{this.state.roster[i].weight}</td>
                    <td>{this.state.roster[i].age}</td>
                    <td>{this.state.roster[i].school}</td>
                </tr>
            ))
        }
        if (!(Object.keys(this.state.stats).length === 0) && typeof(this.state.stats) === "object") {
            return (
                <div className="player justify-content-center">
                    <div className="text-light team-overlay">
                        <div className="container center pb-4">
                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <img src={ this.state.logo } alt={`${this.state.standings.name}`}></img>
                                </div>
                                <div className="col-sm-12 col-md-8">
                                    <h1 className="display-1">
                                        {`${this.state.standings.name}`}
                                    </h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-3">
                                    <div>2019-20 Season </div>
                                    <div>{this.state.standings.W}-{this.state.standings.L} ({this.state.standings.PCT})</div>
                                    <div> {getRank(this.state.standings.rank)} in {this.state.standings.conference}</div>
                                </div>
                                <div className="col-sm-12 col-md-8">
                                    <div className="row">
                                        <div className="col col-md-3 text-center">
                                            <h2>PPG</h2>
                                            <h3>{getRank(this.state.stats.ppg)}</h3>
                                        </div>
                                        <div className="col col-md-3 text-center">
                                            <h2>RPG</h2>
                                            <h3>{getRank(this.state.stats.rpg)}</h3>
                                        </div>
                                        <div className="col col-md-3 text-center">
                                            <h2>APG</h2>
                                            <h3>{getRank(this.state.stats.apg)}</h3>
                                        </div>
                                        <div className="col col-md-3 text-center">
                                            <h2>OPPG</h2>
                                            <h3>{getRank(this.state.stats.oppg)}</h3>
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
                                        {this.state.roster.length === 0 ? null : roster}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="player justify-content-center">
                    <div className="text-light">
                        <div className="d-flex align-items-center container-fluid mx-auto dark-overlay center justify-content-center">
                            <Loader 
                                type="Puff"
                                color="#f7f7f7"
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default Team;