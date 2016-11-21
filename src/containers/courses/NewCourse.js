import React from 'react';
import CourseForm from './CourseForm';
import { connect } from 'react-redux';

import { createCourseRequest } from '../../actions/courseActions';
import { addFlashMessage } from '../../actions/flashMessages';

import RoleAwareContainer from '../auth/RoleAwareContainer';

class NewCourse extends RoleAwareContainer {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = ['admin'];
  }

  render() {
    const { createCourseRequest, addFlashMessage } = this.props;
    const newCourse =  (
      <div>
        <CourseForm
          createCourseRequest={createCourseRequest}
          addFlashMessage={addFlashMessage}
        />
      </div>

    );
    return this.shouldBeVisible() ? newCourse : null;
  }
}

NewCourse.propTypes = {
  createCourseRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
  //userSignInAfterSignUp: React.PropTypes.func.isRequired
}

export default connect(null, { createCourseRequest, addFlashMessage })(NewCourse);
