import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

Meteor.settings.public.planRoleMap.administrator.forEach(role => {
  Roles.createRole(role, {unlessExists: true});
});
