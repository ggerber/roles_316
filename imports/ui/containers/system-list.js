import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

import Collection from '../../api/collections/client/ManageSystems';
import Component from '../pages/system-list';

const SystemListContainer = withTracker(() => {
  const subscription = Meteor.subscribe('systems.list');
  const isloading = !subscription.ready();

  const resp = {
    isloading
  };

  if (!isloading) resp.systems = Collection.find().fetch();
  console.log('systemlist container resp', resp);
  return resp;
})(Component);

export default SystemListContainer;
