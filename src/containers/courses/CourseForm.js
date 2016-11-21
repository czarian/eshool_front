import React from 'react';
import TextAreaGroup from '../../components/common/TextAreaGroup';
import TextFieldGroup from '../../components/common/TextFieldGroup';

import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  let errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = ['This field is required'];
  }
  if (validator.isEmpty(data.description)) {
    errors.description = ['This field is required'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

class CourseForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
          name: '',
          description: '',
          errors: {},
          isLoading: false
      };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if (this.isValid()) {

      this.setState({ errors: {}, isLoading: true });
      const payload = {course: {
          name: this.state.name,
          description: this.state.description,
        }
      }
      this.props.createCourseRequest(payload).then(
        (res) => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You created a new Course'
          });
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    const { errors, name, description, isLoading } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Course</h1>

          <TextFieldGroup
            field="name"
            label="Enter a course name"
            value={name}
            error={errors.name}
            onChange={this.onChange}
          />


          <TextAreaGroup
            field="description"
            label="Enter a description"
            value={description}
            error={errors.description}
            onChange={this.onChange}
            type="textarea"
          />

          <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Create</button></div>
        </form>
      </div>
    );
  }

}

CourseForm.propTypes = {
  createCourseRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

CourseForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default CourseForm;
