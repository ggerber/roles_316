/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import ResponsiveContainer from './responsive-container';

class ErrorBoundary extends PureComponent {
  state = {
    error: null,
    errorInfo: null
  };

  // https://reactjs.org/docs/error-boundaries.html
  componentDidCatch = (error, errorInfo) => {
    this.setState({error, errorInfo});
  };

  render = () => {
    const {children} = this.props;
    const {error, errorInfo} = this.state;

    let resp = children;
    if (errorInfo) {
      resp = (
        <ResponsiveContainer>
          <div style={{textAlign: 'center'}}>
            <FontAwesomeIcon icon={faExclamationTriangle} size="5x" color="#428bca" />
          </div>
          <h2>Something went wrong</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {error && String(error)}
            <br />
            {errorInfo.componentStack}
          </details>
        </ResponsiveContainer>
      );
    }
    return resp;
  };
}

export default ErrorBoundary;
