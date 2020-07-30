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
      <p>
        You have: {get(profile, "team", ["DEFAULT"])} set as your favorite team
      </p>
      <p>Your location is set to: {get(profile, "location", ["DEFAULT"])}.</p>
      <p>Current status {get(profile, "status", ["DEFAULT"])}</p>
      <p>
        Your IG:
        <a href={get(profile, "instagram", ["DEFAULT"])}>
          {get(profile, "instagram", ["DEFAULT"])}
        </a>
      </p>
      <p>
        Your Twitter:
        <a href={get(profile, "twitter", ["DEFAULT"])}>
          {get(profile, "twitter", ["DEFAULT"])}
        </a>
      </p>
      <p>
        Your YouTube:
        <a href={get(profile, "youtube", ["DEFAULT"])}>
          {get(profile, "youtube", ["DEFAULT"])}
        </a>
      </p>
      {/* <p>
        Here is entire profile -- to get stuff in!{" "}
        {JSON.stringify(profile, "\t")}
      </p> */}
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
