import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Form, Button } from "react-bootstrap";
import { GiBasketballBall } from "react-icons/gi";
import { loginUser } from "../../redux/actions/authActions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // when component updates current errors will be transferred to component's state
  componentDidUpdate(nextProps) {
    if (
      !(Object.keys(nextProps.errors).length === 0) &&
      typeof nextProps.errors === "object"
    ) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // handles the change in input values when a user types
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // handles submission of the form to log a user in
  handleSubmit(event) {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  }

  render() {
    return (
      <Container>
        <div className='authForm'>
          <Row className='justify-content-center my-4'>
            <h1 className='d-block-inline'>
              CourtVision{" "}
              <GiBasketballBall
                size={48}
                className='d-block-inline align-top'
              />
            </h1>
          </Row>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='formGroupEmail'>
              <Form.Control
                type='text'
                placeholder='Email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formGroupPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
          <p className='mx-4 my-3'>
            Don't have an account? <Link to='/register'>Sign up Here</Link>
          </p>
        </div>
      </Container>
    );
  }
}

// declares the various prop types in this component
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  errors: PropTypes.object.isRequired,
};

// creates updated components with auth and errors mapped from state to props
const mapStateToProps = (state) => ({
  auth: state.authorization,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
