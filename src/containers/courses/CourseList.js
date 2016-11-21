import React from 'react';
import { connect } from 'react-redux';

import ShowCourse from '../../components/courses/ShowCourse'

import { getCourseList } from '../../actions/courseActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { logout } from '../../actions/authActions';

import { mapValues } from 'lodash';

class CourseList extends React.Component {

  constructor(props){
    super(props);
    this.setError = this.setError.bind(this);
  }

  componentWillMount(){
    this.props.getCourseList().then(
      (res) => null,
      (err) => this.setError(err)
    );
  }

  setError(err){
    if(err.response.status === 401){
      this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
      this.props.logout();
      this.context.router.push('/login');
    }else if(err.response.status === 404){
      this.props.addFlashMessage({
          type: 'warning',
          text: err.response.data.errors
        });
      this.context.router.push('/');
    }else{
      this.props.addFlashMessage({
          type: 'warning',
          text: 'Unrecognized error. Please contact with admin.'
        });
      this.context.router.push('/');
    }

  }

  render() {
    let courses = [];

    mapValues(this.props.courses, function(o){
      courses.push(<ShowCourse key={o.id} course={o} />);
    });

    /*const courses = this.props.courses.map(course =>
      <ShowCourse key={course.id} course={course} />
    );*/
    return (
        <div className="jumbotron">
          <div className="row">{courses}</div>
        </div>
    );
  }
}

CourseList.propTypes = {
      addFlashMessage: React.PropTypes.func.isRequired,
      courses: React.PropTypes.object.isRequired,
      getCourseList: React.PropTypes.func.isRequired,
      logout: React.PropTypes.func.isRequired
  };

  CourseList.contextTypes = {
      router: React.PropTypes.object.isRequired
  };

function mapStateToProps(state) {
  return {
    courses: state.courses
  }
}

export default connect(mapStateToProps, {getCourseList, addFlashMessage, logout})(CourseList);
