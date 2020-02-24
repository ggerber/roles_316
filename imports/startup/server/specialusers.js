import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import {populatedArray, populatedObject, isString} from '../../api/utils/shared/types';

const {administrator, operator, viewer} = Meteor.settings.public.planRoleMap;

export const globalAdministrators = [
  {
    first: 'Global',
    last: 'Admin',
    email: 'global@admin.com',
    password: 'admin',
    roles: administrator,
    update: {'emails.0.verified': true}
  }
];

export const globalOperators = [
  {
    first: 'Clark',
    last: 'Kent',
    email: 'clarkkent@dailyplanet.com',
    password: 'clarkkent',
    roles: operator,
    update: {'emails.0.verified': true}
  }
];

export const globalViewers = [
  {
    first: 'John',
    last: 'Doe',
    email: 'johndoe@uhambiso.co.za',
    password: 'johndoe',
    roles: viewer,
    update: {'emails.0.verified': true}
  }
];

export const globalUsers = [...globalAdministrators, ...globalOperators, ...globalViewers];

export const addSpecialUsers = (users, scope) => {
  console.log('addSpecialUsers>');
  users.forEach(userDetails => {
    const {first, last, email, password, roles, update} = userDetails;
    let userId;

    const user = Accounts.findUserByEmail(email);
    if (!populatedObject(user)) {
      userId = Accounts.createUser({
        email,
        password,
        profile: {name: {first, last}}
      });
      if (populatedObject(update)) Meteor.users.update(userId, {$set: update});
    } else userId = user._id;

    if (populatedArray(roles) && isString(scope)) {
      console.log('adding user and roles to scope: ', first, roles, scope);
      Roles.addUsersToRoles(userId, roles, scope);
    }
  });
};
