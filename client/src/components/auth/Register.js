import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { GiBasketballBall} from 'react-icons/gi';

class Register extends React.Component {
    render() {
        return (
            <Container>
                <div className="authForm">
                    <Row className="justify-content-center my-4">
                        <h1 className="d-block-inline">CourtVision <GiBasketballBall size={48} className="d-block-inline align-top" /></h1>
                    </Row>
                    <Form>
                        <Form.Group controlID="formGroupEmail">
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group controlID="formGroupUsername">
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group controlID="formGroupPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlID="formGroupConfirmPassword">
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                    <p className="mx-4 my-3">Already have an account? <Link to="/login">Log in Here</Link></p>
                </div>
            </Container>
        );
    }
}

export default Register;