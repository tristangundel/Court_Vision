import React from "react";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class ExampleTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shortName: "",
      nickName: "",
      city: "",
    };
  }

  componentDidMount() {
    fetch("/get-houston")
      .then((res) => res.json())
      .then((data) => {
        if (data.data.cod === "404") {
          this.setState({
            isLoading: false,
            cityNotFound: "404",
          });
        } else {
          // Determine weather icon
          this.setState({
            isLoading: false,
            shortName: data.data.shortName,
            nickName: data.nickName,
            city: data.city,
            cityName: data.data.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const DisplayTeam = (
      <div>
        <p>This is the city: {this.state.city}</p>
        <p>This is the shortName: {this.state.shortName}</p>
        <p>This is the nickName: {this.state.nickName}</p>
      </div>
    );

    const currentTeam = <div> {DisplayTeam} </div>;

    return <div>{currentTeam}</div>;
  }
}

export default ExampleTeam;
