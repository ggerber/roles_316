import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

import Collection from '../../api/collections/client/Navigation';
import Component from '../components/navigation-bar';

import {isString} from '../../api/utils/shared/types';

const NavigationContainer = withTracker(props => {
  const {systemId} = props;

  let isloading = true;
  const resp = {};

  if (isString(systemId)) {
    const subscription = Meteor.subscribe('navigation', {systemId});
    isloading = !subscription.ready();
    if (!isloading) {
      const {name} = Collection.findOne(systemId) || {};
      Object.assign(resp, {name});
    }
  } else isloading = false;

  Object.assign(resp, {isloading, ...props});
  return resp;
})(Component);

export default NavigationContainer;
