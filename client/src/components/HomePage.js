import React from "react";
// import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class HomePage extends React.Component {
  render() {
    // retrieve whether or not user is logged in
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    } else {
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
}

HomePage.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(HomePage));
