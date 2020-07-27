import React from 'react';
import PropTypes from 'prop-types';
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
    }

    handleChange(event) {
        const filteredOptions = this.options.filter(
            (player) => option.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
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
                userInput: filteredOptions[activeOption]
              });
        } else if (event.keycode === 38) {
            if (activeOption === 0) {
                return;
              }
            this.setState({ activeOption: activeOption - 1 });
        } else if (event.keycode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
              }
              this.setState({ activeOption: activeOption + 1 });
        }
    }

    handleClick(event) {
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
        return (
            <div>

            </div>
        );
    }
}
