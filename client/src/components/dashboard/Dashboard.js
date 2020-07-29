import React, { Fragment, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log("This is the user", user);
    console.log("This is the user.user.id", user.user.id);
    console.log("This is the profile", profile);
  }, [getCurrentProfile, user, profile]);

  return (
    <Fragment>
      <p className='lead'>
        <i className='fas fa-user' /> This is the user.id {user && user.user.id}
      </p>
      <h1>This is the Dashboard </h1>
      <h4> Favorite players </h4>
      <h4> Favorite teams </h4>
      <h4> Status </h4>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
