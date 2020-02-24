import React, {PureComponent} from 'react';
import {Container, Col} from 'reactstrap';

class ResponsiveContainer extends PureComponent {
  render = () => {
    const {children} = this.props;
    return (
      <Container fluid>
        <Col md={{size: 6, offset: 3}}>{children}</Col>
      </Container>
    );
  };
}

export default ResponsiveContainer;
