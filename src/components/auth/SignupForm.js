import React from 'react';
//import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';


import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  let errors = {};

  if (validator.isEmpty(data.first_name)) {
    errors.first_name = ['This field is required'];
  }
  if (validator.isEmpty(data.last_name)) {
    errors.last_name = ['This field is required'];
  }
  if (validator.isEmpty(data.email)) {
    errors.email = ['This field is required'];
  }
  if (!validator.isEmail(data.email)) {
    errors.email = ['Email is invalid'];
  }
  if (validator.isEmpty(data.password)) {
    errors.password = ['This field is required'];
  }
  if (validator.isEmpty(data.password_confirmation)) {
    errors.password_confirmation = ['This field is required'];
  }
  if (!validator.equals(data.password, data.password_confirmation)) {
    errors.password_confirmation = ['Passwords must match'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /*checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }*/

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      const payload = {user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          first_name: this.state.first_name,
          last_name: this.state.last_name
        }
      }
      this.props.userSignupRequest(payload).then(
        (res) => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <TextFieldGroup
          error={errors.first_name}
          label="Frirst name"
          onChange={this.onChange}
          value={this.state.first_name}
          field="first_name"
        />

        <TextFieldGroup
          error={errors.last_name}
          label="Last name"
          onChange={this.onChange}
          value={this.state.last_name}
          field="last_name"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.password_confirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.password_confirmation}
          field="password_confirmation"
          type="password"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;
