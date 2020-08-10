import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get } from "lodash";
import Loader from "react-loader-spinner";
import { getCurrentProfile } from "../../redux/actions/profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../client/src/";

const Dashboard = ({
  getCurrentProfile,
  auth: { user, isAuthenticated },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile(user.user.id);
  }, [getCurrentProfile]);

  // Check to see if we have a profile to load
  // If it is empty we show welcome new user and redirect to create form
  return loading && profile === null ? (
    <Loader />
  ) : (
    <Fragment>
      <div className='landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='col-md-12 text-center'></div>
            <p>
              Welcome{" "}
              {get(profile, "user.name", ["New Court Vision member :) "])}!
            </p>
            {profile !== null ? (
              <Fragment>
                <p>
                  You have: {get(profile, "team", ["DEFAULT"])} set as your
                  favorite team
                </p>
                <p>
                  Your location is set to:{" "}
                  {get(profile, "location", ["DEFAULT"])}.
                </p>
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
                {/* These below are things we can add later on - Ex: person has
                favorite player set as Curry. User would see stats about Curry
                and latest news. Same with team.
                <p>Below are some statistics on your favorite team:</p>
                <p>Here are some statistics on your favorite players:</p> */}
                <p>
                  To edit profile click here:{" "}
                  <Link to='/create-profile'> Update Profile </Link>{" "}
                </p>
              </Fragment>
            ) : (
              <Fragment>
                {/* <p>
                  Here is entire user -- to get stuff in!{" "}
                  {JSON.stringify(user, "\t")}
                </p> */}
                <p>
                  You have not created a profile .. to do so click the link
                  below <Link to='/create-profile'> Create Profile </Link>
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
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
