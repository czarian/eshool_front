import React from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
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

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      const payload = {user: {email: this.state.email, password: this.state.password}}
      this.props.login(payload).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState( {errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, email, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="email"
          label="Username / Email"
          value={email}
          error={errors.email}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
