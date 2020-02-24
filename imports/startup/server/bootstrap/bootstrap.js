import {Meteor} from 'meteor/meteor';
import Systems from '../../../api/collections/server/Systems.js';
import {globalUsers, addSpecialUsers} from '../specialusers';

if (Meteor.users.find().count() === 0) {
  console.log('Adding global users...');
  addSpecialUsers(globalUsers, 'SUBSCRIPTION');
}

if (Systems.find().count() === 0) {
  // Assume that if no Systems, then all other collections also empty
  console.log('Bootstraping... ');
  const systemPromises = [import('./systems/chdm/chdm.js')];

  // https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
  systemPromises.reduce(
    (prevPromise, systemPromise) => prevPromise.then(() => systemPromise.then(module => module.default())),
    Promise.resolve()
  );
}
