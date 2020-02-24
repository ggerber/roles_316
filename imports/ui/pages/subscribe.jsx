import React, {PureComponent} from 'react';
import {Meteor} from 'meteor/meteor';
import {Button} from 'reactstrap';

// import {Accounts} from 'meteor/accounts-base';

import ResponsiveContainer from '../components/responsive-container';
import JsonSchemaForm from '../components/jsonschema-form';

// import sendVerificationEmail from '../../api/methods/shared/user';

const schema = {
  title: 'Subscribe',
  type: 'object',
  required: ['plan'],
  properties: {
    plan: {type: 'string', title: 'Plan', default: ''}
  }
};

class Subscribe extends PureComponent {
  state = {
    submitErrorText: ''
  };

  onSubmit = ({formData}) => {
    const self = this;
  };

  signOut = () => Meteor.logout();

  render = () => {
    const {submitErrorText} = this.state;

    return (
      <ResponsiveContainer>
        <JsonSchemaForm
          key="form"
          showForm
          successText="Welcome!"
          schema={schema}
          submitButtonText="Subscribe"
          submitErrorText={submitErrorText}
          onSubmit={this.onSubmit}
        />
        <Button key="signout" onClick={this.signOut} block color="link" className="text-left">
          Subscribe later? Sign Out
        </Button>
      </ResponsiveContainer>
    );
  };
}

export default Subscribe;
