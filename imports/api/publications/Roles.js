import {Meteor} from 'meteor/meteor';
import {populatedString} from '../utils/shared/types';

// publish all the roles of the signed-in user
Meteor.publish('user.roles', function userroles() {
  if (populatedString(this.userId)) {
    return Meteor.roleAssignment.find({'user._id': this.userId});
  }
  this.ready();
});
