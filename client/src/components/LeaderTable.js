import React from 'react';

const leadersByStat = {
    'PPG': [
        {
            'rank': '1',
            'name': 'James Harden',
            'team': 'HOU',
            'stat': '34.4'
        },
        {
            'rank': '2',
            'name': 'Bradley Beal',
            'team': 'WAS',
            'stat': '30.5'
        },
        {
            'rank': '3',
            'name': 'Giannis Antetokounmpo',
            'team': 'MIL',
            'stat': '29.6'
        },
        {
            'rank': '4',
            'name': 'Trae Young',
            'team': 'ATL',
            'stat': '29.6'
        },
        {
            'rank': '5',
            'name': 'Damian Lillard',
            'team': 'POR',
            'stat': '28.9'
        },
    ],
    'RPG': [
        {
            'rank': '1',
            'name': 'Andre Drummond',
            'team': 'CLE',
            'stat': '15.2'
        },
        {
            'rank': '2',
            'name': 'Hassan Whiteside',
            'team': 'POR',
            'stat': '14.2'
        },
        {
            'rank': '3',
            'name': 'Giannis Antetokounmpo',
            'team': 'MIL',
            'stat': '13.7'
        },
        {
            'rank': '4',
            'name': 'Rudy Gobert',
            'team': 'UTA',
            'stat': '13.7'
        },
        {
            'rank': '5',
            'name': 'Domantas Sabonis',
            'team': 'IND',
            'stat': '12.4'
        },
    ],
    'APG': [
        {
            'rank': '1',
            'name': 'LeBron James',
            'team': 'LAL',
            'stat': '10.6'
        },
        {
            'rank': '2',
            'name': 'Trae Young',
            'team': 'ATL',
            'stat': '9.3'
        },
        {
            'rank': '3',
            'name': 'Ricky Rubio',
            'team': 'PHX',
            'stat': '8.9'
        },
        {
            'rank': '4',
            'name': 'Luka Doncic',
            'team': 'DAL',
            'stat': '8.7'
        },
        {
            'rank': '5',
            'name': 'Ben Simmons',
            'team': 'PHI',
            'stat': '8.2'
        },
    ],
    'BPG': [
        {
            'rank': '1',
            'name': 'Hassan Whiteside',
            'team': 'POR',
            'stat': '3.1'
        },
        {
            'rank': '2',
            'name': 'Brook Lopez',
            'team': 'MIL',
            'stat': '2.4'
        },
        {
            'rank': '3',
            'name': 'Anthony Davis',
            'team': 'LAL',
            'stat': '2.4'
        },
        {
            'rank': '4',
            'name': 'Myles Turner',
            'team': 'IND',
            'stat': '2.2'
        },
        {
            'rank': '5',
            'name': 'Kristaps Porzingis',
            'team': 'DAL',
            'stat': '2.1'
        },
    ],
    'SPG': [
        {
            'rank': '1',
            'name': 'Ben Simmons',
            'team': 'PHI',
            'stat': '2.1'
        },
        {
            'rank': '2',
            'name': 'Kris Dunn',
            'team': 'CHI',
            'stat': '2.0'
        },
        {
            'rank': '3',
            'name': 'Andre Drummond',
            'team': 'CLE',
            'stat': '1.9'
        },
        {
            'rank': '4',
            'name': 'Fred VanVleet',
            'team': 'TOR',
            'stat': '1.9'
        },
        {
            'rank': '5',
            'name': 'Kawhi Leonard',
            'team': 'LAC',
            'stat': '1.8'
        },
    ],
    'FG%': [
        {
            'rank': '1',
            'name': 'Mitchell Robinson',
            'team': 'NYK',
            'stat': '74.2'
        },
        {
            'rank': '2',
            'name': 'Rudy Gobert',
            'team': 'UTA',
            'stat': '69.8'
        },
        {
            'rank': '3',
            'name': 'Jarrett Allen',
            'team': 'BKN',
            'stat': '64.6'
        },
        {
            'rank': '4',
            'name': 'Clint Capela',
            'team': 'HOU',
            'stat': '62.9'
        },
        {
            'rank': '5',
            'name': 'Brandon Clarke',
            'team': 'MEM',
            'stat': '62.3'
        },
    ]
}


const leaders = (stat) => leadersByStat[stat].map(player =>
        <tr>
            <td>{player.rank}</td>
            <td>{player.name}</td>
            <td>{player.team}</td>
            <td>{player.stat}</td>
        </tr>
)

export default function LeaderTable(props) {
    return (
        <div>
            <table className="table table-striped table-dark table-hover">
                <thead>
                    <th colspan='4'>{props.stat}</th>
                </thead>
                <tbody>
                    {leaders(props.stat)}
                </tbody>
            </table>
        </div>
    )
}
