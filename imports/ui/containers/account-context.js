// https://forums.meteor.com/t/react-context-withtracker-is-awesome/43811
import {Meteor} from 'meteor/meteor';
import React, {createContext} from 'react';
import {Roles} from 'meteor/alanning:roles';
import {withTracker} from 'meteor/react-meteor-data';
import {populatedObject} from '../../api/utils/shared/types';

const AccountContext = createContext('account');

const provider = ({account, children}) => <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;

const withAccount = withTracker(() => {
  const user = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  const verifiedEmail = user && 'emails' in user && user.emails[0].verified;

  const subscription = Meteor.subscribe('user.roles');
  const isloading = !subscription.ready();

  const account = {
    loggingIn,
    signedIn: !loggingIn && populatedObject(user) && verifiedEmail,
    roles: {}
  };

  if (!isloading && populatedObject(user) && '_id' in user) {
    const {_id} = user;

    Roles.getScopesForUser(_id).forEach(group => {
      account.roles[group] = Roles.getRolesForUser(_id, group);
    });
  }

  const resp = {
    account
  };
  console.log('resp', resp);
  return resp;
});

export const AccountProvider = withAccount(provider);
export const AccountConsumer = AccountContext.Consumer;
