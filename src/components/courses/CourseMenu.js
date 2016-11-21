import React from 'react';
import { Link } from 'react-router';

import RoleAwareContainer from '../auth/RoleAwareContainer';

class Courses extends RoleAwareContainer {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = ['regullar'];
  }

  render() {
    const menu =  (
      <div className="list-group">
        <a href="#" className="list-group-item active">
          Course menu
        </a>
        <Link className="list-group-item" to="/newCourse">New Course</Link>
        <a href="#" className="list-group-item">Morbi leo risus</a>
        <a href="#" className="list-group-item">Porta ac consectetur ac</a>
        <a href="#" className="list-group-item">Vestibulum at eros</a>
      </div>

    );
    return this.shouldBeVisible() ? menu : null;
  }
}

export default Courses;
