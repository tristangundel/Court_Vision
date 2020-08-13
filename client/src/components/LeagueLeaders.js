import React from 'react';
import LeaderTable from './LeaderTable';
import axios from 'axios';

class LeagueLeaders extends React.Component {
    
    constructor() {
        super();
        this.state = {
            PPG: [],
            APG: [],
            RPG: [],
            BPG: [],
            SPG: [],
            THREEPM: []
        }
    }

    componentDidMount() {
        axios.get("/api/leaders")
        .then((response) => {
            this.setState(response.data);
        })
        .catch((error) => {
            console.log((error));
        })
    }

    render() {
        return (
            <div className="league-leader justify-content-center">
                <div className="text-light">
                    <div className="container-fluid  dark-overlay center">
                        <div className='ml-10px'>
                            <h1 className='display-4'>League Leaders</h1>
                        </div>
                        <div className="row ">
                            <div className="col-md-6 col-xl-4">
                                <LeaderTable 
                                    stat="PPG"
                                    players={this.state.PPG}
                                />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <LeaderTable 
                                    stat="APG"
                                    players={this.state.APG}
                                />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <LeaderTable 
                                    stat="RPG"
                                    players={this.state.RPG}
                                />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <LeaderTable 
                                    stat="BPG"
                                    players={this.state.BPG}
                                />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <LeaderTable 
                                    stat="SPG"
                                    players={this.state.SPG}
                                />
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <LeaderTable 
                                    stat="3PM"
                                    players={this.state.THREEPM}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeagueLeaders;