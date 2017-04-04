import React from 'react';
import { connect } from 'react-redux';

export const requireAuth = function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isLoggedIn) {
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isLoggedIn) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.login.isLoggedIn,
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {};
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
