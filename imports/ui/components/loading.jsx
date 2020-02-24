/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

class Loading extends PureComponent {
  render = () => {
    return (
      <div style={{textAlign: 'center', padding: '50px'}}>
        <FontAwesomeIcon icon={faSpinner} spin size="5x" color="blue" />
      </div>
    );
  };
}

export default Loading;
