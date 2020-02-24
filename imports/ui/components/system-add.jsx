import {Meteor} from 'meteor/meteor';
import React, {PureComponent} from 'react';

import JsonSchemaForm from './jsonschema-form';

const systemSchema = require('../forms/Systems.json');

class SystemAdd extends PureComponent {
  state = {
    submitErrorText: ''
  };

  onSubmit = ({formData}) => {
    const self = this;
    const {toggle} = self.props;

    Meteor.call('systems.insert', formData, err => {
      if (err) self.setState({submitErrorText: err.reason});
      else toggle();
    });
  };

  render = () => {
    // console.log('render this', this);
    const {submitErrorText} = this.state;

    return (
      <JsonSchemaForm
        key="form"
        showForm
        successText="System added!"
        schema={systemSchema.properties.insert}
        submitButtonText="Save"
        submitErrorText={submitErrorText}
        onSubmit={this.onSubmit}
      />
    );
  };
}

export default SystemAdd;
