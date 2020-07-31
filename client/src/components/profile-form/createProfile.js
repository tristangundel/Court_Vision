import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CreateProfile = (props) => {
  const [formData, setFormdata] = useState({
    location: "",
    status: "",
    team: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const { location, status, team, instagram, twitter, youtube } = formData;

  return (
    <Fragment>
      <h2>Create Your Profile</h2>
      <small>* = required field</small>
      <form class='form'>
        <div class='form-group'>
          <div class='form-group'>
            <input type='text' placeholder='Status' name='company' />
            <small class='form-text'>Status</small>
          </div>
        </div>
        <div class='form-group'>
          <input type='text' placeholder='Location' name='location' />
          <small class='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div class='form-group'>
          <input type='text' placeholder='Favorite team' name='skills' />
          <small class='form-text'>
            Please select a team from the dropdown menus
          </small>
        </div>
        <div class='my-2'>
          <button type='button' class='btn btn-light'>
            Add Social Network Links
          </button>
          <span>
            Optional - please enter entire URL. Example:
            https://www.instagram.com/houstonrockets/?hl=en
          </span>
        </div>

        <div class='form-group social-input'>
          <i class='fab fa-twitter fa-2x'></i>
          <input type='text' placeholder='Twitter URL' name='twitter' />
        </div>

        <div class='form-group social-input'>
          <i class='fab fa-youtube fa-2x'></i>
          <input type='text' placeholder='YouTube URL' name='youtube' />
        </div>

        <div class='form-group social-input'>
          <i class='fab fa-instagram fa-2x'></i>
          <input type='text' placeholder='Instagram URL' name='instagram' />
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <a class='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
