import React from 'react';
import { Link } from 'react-router';
import RoleAwareContainer from '../../containers/auth/RoleAwareContainer';

class CourseLinks extends RoleAwareContainer {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = ['admin'];
  }

  render() {
    const links = (
        <li><Link to="/newCourse">New course</Link></li>
    );
    return this.shouldBeVisible() ? links : null;
  }
}

export default CourseLinks;
