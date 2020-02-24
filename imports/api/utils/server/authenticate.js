import {Roles} from 'meteor/alanning:roles';
import {populatedString, populatedArray, isBoolean} from '../shared/types';

const authenticateRoles = (userId, valid, roles, systemId) => {
  return (
    populatedString(userId) &&
    isBoolean(valid) &&
    populatedArray(roles) &&
    populatedString(systemId) &&
    valid &&
    Roles.userIsInRole(userId, roles, 'SUBSCRIPTION') &&
    Roles.userIsInRole(userId, roles, systemId)
  );
};

export const authenticateSubscription = (userId, valid, roles) => {
  return (
    populatedString(userId) &&
    isBoolean(valid) &&
    populatedArray(roles) &&
    valid &&
    Roles.userIsInRole(userId, roles, 'SUBSCRIPTION')
  );
};

export default authenticateRoles;
