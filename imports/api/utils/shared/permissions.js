import {Meteor} from 'meteor/meteor';

const matchPermissions = roles => {
  let resp;
  const planRoleEntries = Object.entries(Meteor.settings.public.planRoleMap);
  for (let i = 0; i < planRoleEntries.length; i += 1) {
    const [subscription, subscriptionRoles] = planRoleEntries[i];
    const isMatch = subscriptionRoles.length === roles.length && subscriptionRoles.every(role => roles.includes(role));
    if (isMatch) {
      resp = subscription;
      break;
    }
  }
  return resp;
};

export default matchPermissions;
