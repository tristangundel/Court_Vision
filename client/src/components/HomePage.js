import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class HomePage extends React.Component {
  render() {
    return (
      <div className='landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h1 className='display-3 mb-4'>CourtVision</h1>
                <hr />
                <Link to='register' className='btn btn-lg btn-info mr-2'>
                  Sign Up
                </Link>
                <Link to='login' className='btn btn-lg btn-light'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import api from "./teams";

const IndexPage = () => {
  // Create state variables
  let [responseData, setResponseData] = React.useState("");
  // fetches data
  const fetchData = (e) => {
    e.preventDefault();
    api
      .getData()
      .then((response) => {
        setResponseData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>{responseData.title}</h1>
      <button onClick={(e) => fetchData(e)} type='button'>
        Click Me For Data
      </button>
      {responseData.dates &&
        responseData.dates.map((date) => {
          return <p>{date}</p>;
        })}
    </div>
  );
};
export default IndexPage;
