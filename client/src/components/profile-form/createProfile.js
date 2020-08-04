import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../redux/actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    status: "",
    team: "",
    location: "",
    youtube: "",
    instagram: "",
    twitter: "",
  });

  const { location, status, team, instagram, twitter, youtube } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h2>Create Your Profile</h2>
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Status'
              name='status'
              value={status}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div class='form-group'>
          <small class='form-text'>
            Please select a team from the dropdown menus
          </small>
          <select name='team' value={team} onChange={(e) => onChange(e)}>
            <option value='0'> Select A Team</option>
            <option value='Atlanta Hawks'>Atlanta Hawks</option>
            <option value='Boston Celtics'>Boston Celtics</option>
            <option value='Brooklyn Nets'>Brooklyn Nets</option>
            <option value='Charlotte Hornets'>Charlotte Hornets</option>
            <option value='Chicago Bulls'>Chicago Bulls</option>
            <option value='Cleveland Cavaliers'>Cleveland Cavaliers</option>
            <option value='Detroit Pistons'>Detroit Pistons</option>
            <option value='Indiana Pacers'>Indiana Pacers</option>
            <option value='Miami Heat'>Miami Heat</option>
            <option value='Milwaukee Bucks'>Milwaukee Bucks</option>
            <option value='New York Knicks'>New York Knicks</option>
            <option value='Orlando Magic'>Orlando Magic</option>
            <option value='Cleveland Cavaliers'>Cleveland Cavaliers</option>
            <option value='Philadelphia 76ers'>Philadelphia 76ers</option>
            <option value='Toronto Raptors'>Toronto Raptors</option>
            <option value='Dallas Mavericks'>Dallas Mavericks</option>
            <option value='Denver Nuggets'>Denver Nuggets</option>
            <option value='Golden State Warriors'>Golden State Warriors</option>
            <option value='Houston Rockets'>Houston Rockets</option>
            <option value='Los Angeles Clippers'>Los Angeles Clippers</option>
            <option value='Los Angeles Lakers'>Los Angeles Lakers</option>
            <option value='Memphis Grizzlies'>Memphis Grizzlies</option>
            <option value='Minnesota Timberwolves'>
              Minnesota Timberwolves
            </option>
            <option value='New Orleans Pelicans'>New Orleans Pelicans</option>
            <option value='Oklahoma City Thunder'>Oklahoma City Thunder</option>
            <option value='Golden State Warriors'>Golden State Warriors</option>
            <option value='Phoenix Suns'>Phoenix Suns</option>
            <option value='Portland Trail Blazers'>
              Portland Trail Blazers
            </option>
            <option value='Sacramento Kings'>Sacramento Kings</option>
            <option value='San Antonio Spurs'>San Antonio Spurs</option>
            <option value='Utah Jazz'>Utah Jazz</option>
          </select>
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
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
          <i class='fab fa-youtube fa-2x'></i>
          <input
            type='text'
            placeholder='YouTube URL'
            name='youtube'
            value={youtube}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div class='form-group social-input'>
          <i class='fab fa-twitter fa-2x'></i>
          <input
            type='text'
            placeholder='Twitter URL'
            name='twitter'
            value={twitter}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div class='form-group social-input'>
          <i class='fab fa-instagram fa-2x'></i>
          <input
            type='text'
            placeholder='Instagram URL'
            name='instagram'
            value={instagram}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <a class='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
