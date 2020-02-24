import React, {PureComponent} from 'react';
import {Media, Badge} from 'reactstrap';

class MediaBadge extends PureComponent {
  render = () => {
    const {color, children} = this.props;
    return (
      <Media left top style={{paddingRight: '10px'}}>
        <h3>
          <Badge color={color}>{children}</Badge>
        </h3>
      </Media>
    );
  };
}

export default MediaBadge;
