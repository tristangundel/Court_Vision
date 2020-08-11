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
    <div className="d-flex align-items-center  dark-overlay center justify-content-center">
                            <Loader 
                                type="Puff"
                                color="#f7f7f7"
                            />
      </div>
  ) : (
    <Fragment>
      <div className='landing d-flex'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='col-md-12 text-center'></div>
            <h1 className="display-2">
              Welcome{" "}
              {get(profile, "user.name", ["New Court Vision member :) "])}!
            </h1>
            {profile !== null ? (
              <Fragment>
                <h1 className="display-4 my-4">
                  Favorite Team: {get(profile, "team", ["DEFAULT"])}
                </h1>
                <div className="row my-4">
                <h2 className='d-flex col-3'>
                  Location:{" "}
                  {get(profile, "location", ["DEFAULT"])}
                </h2>
                <h2 className="d-flex col-9 justify-content-center">Current status: {get(profile, "status", ["DEFAULT"])}</h2>
                </div>
                
                <div className="row">
                  <h4 className="d-flex align-items-center col-4 justify-content-center">
                    Your IG: 
                    <a href={get(profile, "instagram", ["DEFAULT"])} className='ml-2'>
                      <i class="fab fa-instagram text-light fa-2x"></i>
                    </a>
                  </h4>
                  <h4 className="d-flex align-items-center col-4 justify-content-center">
                    Your Twitter:
                    <a href={get(profile, "twitter", ["DEFAULT"])} className='ml-2'>
                      <i class="fab fa-twitter text-light fa-2x"></i>
                    </a>
                  </h4>
                  <h4 className='d-flex align-items-center col-4 justify-content-center'>
                    Your YouTube:
                    <a href={get(profile, "youtube", ["DEFAULT"])} className='ml-2'>
                      <i class="fab fa-youtube text-light fa-2x"></i>
                    </a>
                  </h4>
                </div>
                
                {/* These below are things we can add later on - Ex: person has
                favorite player set as Curry. User would see stats about Curry
                and latest news. Same with team.
                <p>Below are some statistics on your favorite team:</p>
                <p>Here are some statistics on your favorite players:</p> */}
                <h4 className='d-flex justify-content-center my-5'>
                  <small className='text-muted'>To edit profile click here:{" "}
                  <Link to='/create-profile' className="text-success"> Update Profile </Link>{" "}</small>
                </h4>
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
