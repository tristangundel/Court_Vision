import React, { Fragment, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Loader from "react-loader-spinner";
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
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <p>Here is user.user.id {user.user.id}</p>
      <p>Welcome {JSON.stringify(profile, ["user"])}</p>
      <p>Here is entire profile {JSON.stringify(profile, "\t")}</p>
      <p>Favorite team {JSON.stringify(profile, ["team"])}</p>
      <p>Here is the location {JSON.stringify(profile, ["location"])}</p>
      <p>Here is the website {JSON.stringify(profile, ["website"])}</p>
      <p>Here is the id {JSON.stringify(profile, ["_id"])}</p>
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
