import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

const teamInfo = {
    "city":"Atlanta",
    "fullName":"Atlanta Hawks",
    "teamId":"1",
    "nickname":"Hawks",
    "logo":"https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
    "shortName":"ATL",
    "allStar":"0",
    "nbaFranchise":"1",
    "leagues":{
        "standard":{
            "confName":"East",
            "divName":"Southeast"
        }
    }
}

const playersInfo = [
    {   
        "firstName":"Jeff",
        "lastName":"Teague",
        "collegeName":"Wake Forest",
        "country":"USA",
        "dateOfBirth":"1988-06-10",
        "heightInMeters":"1.91",
        "weightInKilograms":"88.45",
        "leagues":{
            "standard":{
                "jersey":"00",
                "pos":"G" 
            }
        }
    },
    {
        "firstName":"Brandon",
        "lastName":"Goodwin",
        "collegeName":"Florida Gulf Coast",
        "country":"USA",
        "dateOfBirth":"1995-10-02",
        "heightInMeters":"1.83",
        "weightInKilograms":"81.65",
        "leagues":{
            "standard":{
                "jersey":"0",
                "pos":"G"
            }
        }
    },
    {   
        "firstName":"Treveon",
        "lastName":"Graham",
        "collegeName":"Virginia Commonwealth",
        "country":"USA",
        "dateOfBirth":"1993-10-28",
        "heightInMeters":"1.96",
        "weightInKilograms":"99.3367",
        "leagues":{
            "standard":{
                "jersey":"2",
                "pos":"G-F" 
            }
        }
    },
    {   
        "firstName":"Kevin",
        "lastName":"Huerter",
        "collegeName":"Maryland",
        "country":"USA",
        "dateOfBirth":"1998-08-27",
        "heightInMeters":"2.01",
        "weightInKilograms":"86.1826",
        "leagues":{
            "standard":{
                "jersey":"3",
                "pos":"G-F" 
            }
        }
    },
    {   
        "firstName":"Charles",
        "lastName":"Brown, Jr.",
        "collegeName":"",
        "country":"USA",
        "dateOfBirth":"1997-02-02",
        "heightInMeters":"1.98",
        "weightInKilograms":"90.26",
        "leagues":{
            "standard":{
                "jersey":"4",
                "pos":"G" 
            }
        }
    },
    {   
        "firstName":"Skal",
        "lastName":"Labissiere",
        "collegeName":"Kentucky",
        "country":"Haiti",
        "dateOfBirth":"1996-03-18",
        "heightInMeters":"2.0828",
        "weightInKilograms":"106.594",
        "leagues":{
            "standard":{
                "jersey":"7",
                "pos":"F-C" 
            }
        }
    },
    {   
        "firstName":"Trae",
        "lastName":"Young",
        "collegeName":"Oklahoma",
        "country":"USA",
        "dateOfBirth":"1998-09-19",
        "heightInMeters":"1.85",
        "weightInKilograms":"81.6466",
        "leagues":{
            "standard":{
                "jersey":"11",
                "pos":"G" 
            }
        }
    },
]

function getAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

function getHeight(hinm) {
    var feet = Math.floor(hinm * 3.281);
    var inches = Math.floor(hinm * 39.37 % 12);
    var height = feet + "' " + inches + "\""

    return height;
}

function getWeight(wik) {
    return Math.floor(wik * 2.205);
}

const roster = playersInfo.map(player =>
    <tr>
        <td scope="row">{player.firstName} {player.lastName}</td>
        <td>{player.leagues.standard.jersey}</td>
        <td>{player.leagues.standard.pos}</td>
        <td>{getHeight(player.heightInMeters)}</td>
        <td>{getWeight(player.weightInKilograms)}</td>
        <td>{getAge(player.dateOfBirth)}</td>
        <td>{player.collegeName}</td>
    </tr>
);


class Team extends React.Component {
    
    render() {
        return (
            <div className="player justify-content-center">
                <div className="text-light">
                    <div className="container  dark-overlay center">
                        <div className="row">
                            <div className="col-4">
                                <img height='250px' src={ require('../img/ATL_logo.svg') }></img>
                            </div>
                            <div className="col-8">
                                <h1 className="display-1">
                                    {teamInfo.fullName}
                                </h1>
                                <div className="row">
                                    <div className="col-3">
                                        <div>2019-20 Season </div>
                                        <div>20-47 (.299)</div>
                                        <div>14th in {teamInfo.leagues.standard.confName}</div>
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
                                    {roster}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Team;