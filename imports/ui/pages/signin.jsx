import React, {PureComponent} from 'react';
import {Meteor} from 'meteor/meteor';

import ResponsiveContainer from '../components/responsive-container';
import JsonSchemaForm from '../components/jsonschema-form';
import StyledLink from '../components/styled-link';
import StyledExternalLink from '../components/styled-externallink';

const schema = {
  title: 'Sign In',
  type: 'object',
  required: ['contactEmail', 'password'],
  properties: {
    contactEmail: {type: 'string', title: 'Email', default: '', minLength: 3},
    password: {type: 'string', title: 'Password', default: '', minLength: 3}
  }
};

const uiSchema = {
  password: {
    'ui:widget': 'password'
  }
};

class SignIn extends PureComponent {
  state = {
    submitErrorText: ''
  };

  onSubmit = ({formData}) => {
    const self = this;
    const {afterSignin} = Meteor.settings.public;
    const {contactEmail, password} = formData;

    Meteor.loginWithPassword(contactEmail.trim(), password, err => {
      if (err) self.setState({submitErrorText: err.reason});
      else self.props.history.push(afterSignin);
    });
  };

  render = () => {
    const {submitErrorText} = this.state;

    return (
      <ResponsiveContainer>
        <JsonSchemaForm
          key="form"
          showForm
          successText="Welcome!"
          schema={schema}
          uiSchema={uiSchema}
          submitButtonText="Sign In"
          submitErrorText={submitErrorText}
          onSubmit={this.onSubmit}
        />
        <StyledLink key="forgotlink" to="/recover-password" text="Forgot password?" />
        <StyledLink key="signuplink" to="/signup" text="New here? Sign Up!" />
        <StyledExternalLink key="aboutlink" to="http://www.h2iot.com" text="About" />
      </ResponsiveContainer>
    );
  };
}

export default SignIn;
