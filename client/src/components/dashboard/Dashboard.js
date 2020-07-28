import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profile";

const Dashboard = ({ getCurrentProfile, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile();
    console.log(user);
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user._id}
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
