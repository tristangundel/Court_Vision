import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const playerList =  require('../utils/playerList');

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(event) {
        const filteredOptions = this.props.options.filter(
            (player) => player.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        );
        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput: event.target.value
        });
    }

    handleKeyDown(event) {
        if (event.keycode === 13) {
            this.setState({
                activeOption: 0,
                showOptions: false,
                userInput: this.state.filteredOptions[this.state.activeOption]
              });
        } else if (event.keycode === 38) {
            if (this.state.activeOption === 0) {
                return;
              }
            this.setState({ activeOption: this.state.activeOption - 1 });
        } else if (event.keycode === 40) {
            if (this.state.activeOption === this.state.filteredOptions.length - 1) {
                return;
              }
            this.setState({ activeOption: this.state.activeOption + 1 });
        }
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: event.currentTarget.innerText
          });
    }

    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired
    };

    render() {
        let optionList;
        if (this.state.showOptions && this.state.userInput) {
            if (this.state.filteredOptions.length !== 0) {
                optionList = (
                    <ul className="options">
                        {this.state.filteredOptions.map((option, index) => {
                            let className ='';
                            if (index === this.state.activeOption) {
                                className = 'option-active';
                            }
                            if (index < 5) {
                                return (
                                    <li className={className} key={option} onClick={this.handleClick}>
                                        {option}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                )
            }
            else {
                optionList = (
                    <div className="no-options options">
                        <em>No Player Results...</em>
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                <div className="search-container p-1">
                    <input 
                        type="text"
                        className="search-box"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.userInput}
                    />
                    <Link 
                        to={`/player/${this.state.userInput}`}
                        className="search-button">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Link>
                    {optionList}
                </div>
            </React.Fragment>
        );
    }
}


export default SearchBar;