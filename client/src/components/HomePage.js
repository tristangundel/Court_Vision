import React from 'react';
// import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">CourtVision
                        </h1>
                        <hr />
                        <Link to="register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                        <Link to="login" className="btn btn-lg btn-light">Login</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default HomePage;