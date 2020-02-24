import {populatedString, populatedArray, populatedObject} from '../shared/types';

const authenticateRole = (systemId, roles, role) => {
  return (
    populatedString(systemId) &&
    populatedObject(roles) &&
    populatedString(role) &&
    populatedArray(roles.SUBSCRIPTION) &&
    roles.SUBSCRIPTION.includes(role) &&
    populatedArray(roles[systemId]) &&
    roles[systemId].includes(role)
  );
};

export const authenticateSubscription = (roles, role) => {
  return (
    populatedObject(roles) &&
    populatedString(role) &&
    populatedArray(roles.SUBSCRIPTION) &&
    roles.SUBSCRIPTION.includes(role)
  );
};

export default authenticateRole;
