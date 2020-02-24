import React, {PureComponent} from 'react';

export class StyledExternalLink extends PureComponent {
  render = () => {
    const {to, text} = this.props;
    return (
      <a key="aboutlink" href={to} className="btn-block" target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  };
}

export default StyledExternalLink;
