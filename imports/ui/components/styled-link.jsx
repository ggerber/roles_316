import React, {PureComponent} from 'react';

import {Link} from 'react-router-dom';

class StyledLink extends PureComponent {
  render = () => {
    const {to, text} = this.props;
    return (
      <Link to={to} className="btn-block">
        {text}
      </Link>
    );
  };
}

export default StyledLink;
