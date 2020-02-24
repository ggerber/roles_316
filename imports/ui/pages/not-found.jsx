/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from 'react';

import {Alert} from 'reactstrap';
import ResponsiveContainer from '../components/responsive-container';

class NotFound extends PureComponent {
  render = () => {
    return (
      <ResponsiveContainer>
        <Alert color="danger">{`Error [404]: ${window.location.pathname} does not exist`}</Alert>
      </ResponsiveContainer>
    );
  };
}

export default NotFound;
