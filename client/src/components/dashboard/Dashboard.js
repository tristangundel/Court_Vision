import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get } from "lodash";
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
      <p>Welcome {get(profile, "user.name", ["DEFAULT"])}!</p>
      <p>Here is user.user.id {user.user.id}</p>
      <p>Welcome {JSON.stringify(profile, ["name"])}</p>
      <p>Here is entire profile {JSON.stringify(profile, "\t")}</p>
      <p>Favorite team {JSON.stringify(profile, ["team"])}</p>
      <p>Here is the location {JSON.stringify(profile, ["location"])}</p>
      <p>Here is the id {JSON.stringify(profile, ["_id"])}</p>
      <p>Here is the status {JSON.stringify(profile, ["status"])}</p>
      <p>Here is the IG {JSON.stringify(profile, ["instagram"])}</p>
      <p>Here is the Twitter {JSON.stringify(profile, ["twitter"])}</p>
      <p>Here is the YouTube {JSON.stringify(profile, ["youtube"])}</p>
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
