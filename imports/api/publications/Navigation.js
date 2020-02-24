import {Meteor} from 'meteor/meteor';
import {ReactiveAggregate as reactiveAggregate} from 'meteor/tunguska:reactive-aggregate';

import {ajvPublications} from '../../startup/server/security';
import authenticateRoles from '../utils/server/authenticate';
import Systems from '../collections/server/Systems';

Meteor.publish('navigation', function navigation(args) {
  const valid = ajvPublications.validate('Systems', {navigation: args});
  const roles = ['view'];
  if (authenticateRoles(this.userId, valid, roles, args.systemId)) {
    const pipeline = [
      {
        $match: {
          _id: args.systemId
        }
      },
      {
        $project: {
          name: 1
        }
      }
    ];
    const options = {clientCollection: 'Navigation'};
    reactiveAggregate(this, Systems, pipeline, options);
  } else this.ready();
});
