import {Meteor} from 'meteor/meteor';

import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from '../../ui/components/loading'; // You cant lazy load the Loading component
import ErrorBoundary from '../../ui/components/error-boundary'; // Also better to have Errorboundary on outside layer of the app
import {AccountProvider} from '../../ui/containers/account-context';

const App = lazy(() => import('../../ui/layouts/app'));

Meteor.startup(() => {
  ReactDOM.render(
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AccountProvider>
          <App />
        </AccountProvider>
      </Suspense>
    </ErrorBoundary>,
    document.getElementById('react-root')
  );
});
