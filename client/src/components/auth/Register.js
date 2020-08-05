import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { GiBasketballBall } from "react-icons/gi";
import { registerUser } from "../../redux/actions/authActions";
import { resetErrors, setErrors } from "../../redux/actions/errorActions";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPass: "",
      errors: [],
      showErrors: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.resetErrors();
  }

  // // Upon updating component, errors will be transferred to state
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

  // handles changes in the input values when a user types
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // handles submission of form to create a new user
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPass) {
      this.props.setErrors([{msg: "Passwords entered do not match!"}])
      this.setState({
        password: "",
        confirmPass: ""
      });
    } else {
      const newUser = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password
      };

      this.props.registerUser(newUser, this.props.history);
    }
  }

  render() {
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
                type='email'
                placeholder='Email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formGroupName'>
              <Form.Control
                type='text'
                placeholder='Name'
                name='name'
                value={this.state.name}
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
            <Form.Group controlId='formGroupConfirmPassword'>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                name='confirmPass'
                value={this.state.confirmPass}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Alert variant="danger" show={this.state.showErrors}>{this.state.errors.length !== 0 ? this.state.errors.msg : null}</Alert>
            <Button variant='primary' type='submit'>
              Register
            </Button>
          </Form>
          <p className='mx-4 my-3'>
            Already have an account? <Link to='/login'>Log in Here</Link>
          </p>
        </div>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser, resetErrors, setErrors })(withRouter(Register));
