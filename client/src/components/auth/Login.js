import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { GiBasketballBall } from "react-icons/gi";
import { loginUser } from "../../redux/actions/authActions";
import { resetErrors } from "../../redux/actions/errorActions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: [],
      showErrors: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.resetErrors();
  }

  // // when component updates current errors will be transferred to component's state
  // componentDidUpdate(nextProps) {
  //   if (!nextProps.errors.length === this.state.errors.length) {
  //     this.setState({ 
  //       errors: nextProps.errors[nextProps.errors.length  - 1],
  //       showErrors: this.state.email.length === 0 ? false : true
  //       });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.errors.length !== 0 && nextProps.errors.length !== prevState.errors.length){
        return ({
          errors: nextProps.errors[nextProps.errors.length  - 1],
          showErrors: nextProps.errors[nextProps.errors.length  - 1].length === 0 ? false : true
        });
    } 
    else {
        return ({showErrors: false});
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
    // retrieve whether or not user is logged in
    if (this.props.auth.isAuthenticated) {
      return (<Redirect to="/"/>)
    }
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
                required
              />
            </Form.Group>
            <Form.Group controlId='formGroupPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Alert variant="danger" show={this.state.showErrors}>{this.state.errors.length !== 0 ? this.state.errors.msg : null}</Alert>
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
  resetErrors: PropTypes.func.isRequired,
  auth: PropTypes.object,
  errors: PropTypes.array.isRequired,
};

// creates updated components with auth and errors mapped from state to props
const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
    errors: state.errors,
  });
};

export default connect(mapStateToProps, { loginUser, resetErrors })(withRouter(Login));
