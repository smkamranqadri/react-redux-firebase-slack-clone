import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import './login.css';

import { loginWithGoogle } from './login.actions';

class LoginContainer extends Component {
  login() {
    this.props.firebase.login({ provider: 'google', type: 'popup' });
  }
  render() {
    return (
      <div className="center">
        <h1 className="text-center">Login to get started...</h1>
        <img src={process.env.PUBLIC_URL + "/google_plus_icon.png"} width="200" height="200" alt="Google Login" onClick={() => this.login()}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginWithGoogle }, dispatch);
};

LoginContainer.propTypes = {
  loginWithGoogle: PropTypes.func.isRequired,
};

LoginContainer.contextTypes = { };

const wrappedLogin = firebaseConnect()(LoginContainer);

export let Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedLogin);
