import React, {PureComponent} from 'react';
import {Route, Redirect} from 'react-router-dom';
import NavigationContainer from '../containers/navigation';

import ErrorBoundary from '../components/error-boundary';

import {AccountConsumer} from '../containers/account-context';
import {populatedArray} from '../../api/utils/shared/types';

class Subscriber extends PureComponent {
  render = () => {
    // console.log('subscriber render this', this);
    const {component, navbar, computedMatch, ...routeProps} = this.props;

    const systemId = computedMatch ? computedMatch.params.systemId : undefined;

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
                  if ('SUBSCRIPTION' in roles && populatedArray(roles.SUBSCRIPTION)) {
                    const element = <ErrorBoundary>{React.createElement(component, {...props})}</ErrorBoundary>;
                    const navigation = navbar ? (
                      <ErrorBoundary>
                        <NavigationContainer navbar={navbar} element={element} systemId={systemId} />
                      </ErrorBoundary>
                    ) : null;

                    comp = (
                      <div>
                        {navigation}
                        {element}
                      </div>
                    );
                  } else comp = <Redirect to="/subscribe" />;
                } else comp = <Redirect to="/signin" />;

                return comp;
              }}
            />
          );
        }}
      </AccountConsumer>
    );
  };
}

export default Subscriber;
