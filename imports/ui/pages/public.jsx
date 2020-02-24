import React, {PureComponent} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {AccountConsumer} from '../containers/account-context';
import {populatedArray} from '../../api/utils/shared/types';

class Public extends PureComponent {
  render = () => {
    const {component, ...routeProps} = this.props;

    return (
      <AccountConsumer>
        {({signedIn, roles}) => {
          return (
            <Route
              {...routeProps}
              render={props => {
                let comp;

                // if (loggingIn) comp = <div />;
                if (signedIn) {
                  // if (loggingIn) else if (signedIn); creates a new component (unwanted)
                  if ('SUBSCRIPTION' in roles && populatedArray(roles.SUBSCRIPTION))
                    comp = <Redirect to="/subscribed/systems" />;
                  else comp = <Redirect to="/subscribe" />;
                } else comp = React.createElement(component, {...props}); // React.createElement(component, {...props, loggingIn, signedIn});

                return comp;
              }}
            />
          );
        }}
      </AccountConsumer>
    );
  };
}

export default Public;
