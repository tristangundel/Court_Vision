import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';


class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: '',
            redirectToPlayer: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: '',
            redirectToPlayer: this.state.userInput
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
                            } else {
                                return null;
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
                <div className="search-container p-1 d-inline">
                    <input 
                        type="text"
                        className="search-box"
                        placeholder="Player Search"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.userInput}
                    />
                    <Button 
                        variant="dark"
                        size="sm"
                        onClick={this.handleSubmit}
                        className="search-button">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                    {optionList}
                    {this.state.redirectToPlayer !== "" ? <Redirect to={"/search/" + this.state.redirectToPlayer} /> : null}
                </div>
            </React.Fragment>
        );
    }
}


export default SearchBar;