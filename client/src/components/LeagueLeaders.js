import React from 'react';
import { Link } from 'react-router-dom';
import LeaderTable from './LeaderTable';

class LeagueLeaders extends React.Component {

    render() {
        return (
            <div className="league-leader justify-content-center">
                <div className="text-light">
                    <div className="container-fluid  dark-overlay center">
                        <div className='ml-10px'>
                            <h1 className='display-4'>League Leaders</h1>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <LeaderTable 
                                    stat="PPG"
                                />
                            </div>
                            <div className="col-4">
                                <LeaderTable 
                                    stat="APG"
                                />
                            </div>
                            <div className="col-4">
                                <LeaderTable 
                                    stat="RPG"
                                />
                            </div>
                            <div className="col-4">
                                <LeaderTable 
                                    stat="BPG"
                                />
                            </div>
                            <div className="col-4">
                                <LeaderTable 
                                    stat="SPG"
                                />
                            </div>
                            <div className="col-4">
                                <LeaderTable 
                                    stat="FG%"
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