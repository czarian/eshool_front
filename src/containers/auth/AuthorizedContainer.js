import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';


export default function(ComposedComponent) {
  class AuthorizedContainer extends React.Component {


    componentWillMount() {

      const { routes } = this.props; // array of routes
      const { router } = this.context;
      this.authorize  = [];

      // check if user data available
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        // redirect to login if not
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        router.push('/login');
        return;
      }

      // get all roles available for this route
      const routeRoles = _.chain(routes)
        .filter(item => item.roles) // access to custom attribute
        .map(item => item.roles)
        .flattenDeep()
        .value();

      // compare routes with user data
      if (_.intersection(routeRoles, [user.role]).length === 0) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You cannot read this page'
        });
        router.push('/');
      }

    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

     render() {
        return (
          <ComposedComponent {...this.props} />
        );
    }
  }

  AuthorizedContainer.propTypes = {
      isAuthenticated: React.PropTypes.bool.isRequired,
      routes: React.PropTypes.array.isRequired,
      addFlashMessage: React.PropTypes.func.isRequired
  };

  AuthorizedContainer.contextTypes = {
      router: React.PropTypes.object.isRequired
  };


  function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(AuthorizedContainer);
}
