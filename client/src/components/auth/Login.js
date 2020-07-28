import { Form, Button } from "react-bootstrap";
// import { GiBasketballBall } from "react-icons/gi";
import { loginUser } from "../../redux/actions/authActions";
import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    console.log("in const onChange");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("in onSubmit");
    console.log("This is the formData", formData);
    loginUser(email, password);
  };

  if (isAuthenticated) {
    console.log("return <Redirect to='/dashboard'");
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formGroupEmail'>
          <Form.Control
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId='formGroupPassword'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
