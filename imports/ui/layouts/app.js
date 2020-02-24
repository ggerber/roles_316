/* eslint react/prefer-stateless-function: 0 */

import React, {lazy, Suspense, PureComponent} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Loading from '../components/loading';
import ErrorBoundary from '../components/error-boundary';

const NotFound = lazy(() => import('../pages/not-found'));

const Public = lazy(() => import('../pages/public'));

const User = lazy(() => import('../pages/user'));
const Subscriber = lazy(() => import('../pages/subscriber'));
const NavigationContainer = lazy(() => import('../containers/navigation'));

const publicRouteDetails = [
  {
    key: 'index',
    path: '/',
    exact: true,
    component: lazy(() => import('../pages/signin'))
  },
  {
    key: 'signIn',
    path: '/signin',
    exact: true,
    component: lazy(() => import('../pages/signin'))
  }
];

const userRouteDetails = [
  {
    key: 'Subscribe',
    path: '/subscribe',
    exact: true,
    component: lazy(() => import('../pages/subscribe'))
  }
];

const subscriberRouteDetails = [
  {
    key: 'SystemListContainer',
    path: '/subscribed/systems',
    exact: true,
    navbar: NavigationContainer,
    component: lazy(() => import('../containers/system-list'))
  }
];

class App extends PureComponent {
  render() {
    const publicRoutes = publicRouteDetails.map(details => <Public {...details} />);
    const userRoutes = userRouteDetails.map(details => <User {...details} />);
    const subscriberRoutes = subscriberRouteDetails.map(details => <Subscriber {...details} />);

    return (
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Router>
            <Switch>
              {publicRoutes}
              {userRoutes}
              {subscriberRoutes}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
