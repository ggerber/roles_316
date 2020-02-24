import {Meteor} from 'meteor/meteor';

import Systems from '../collections/server/Systems';

import {populatedObject, populatedString} from '../utils/shared/types';

Meteor.publish('systems.list', function systemslist() {
  const self = this;
  if (populatedString(self.userId)) {
    const rolesHandle = Meteor.roleAssignment.find({'user._id': self.userId}).observe({
      added({scope}) {
        const system = Systems.findOne(scope, {fields: {name: 1}});
        if (populatedObject(system)) self.added('ManageSystems', scope, system);
      },
      changed({scope}) {
        const system = Systems.findOne(scope, {fields: {name: 1}});
        if (populatedObject(system)) self.changed('ManageSystems', scope, system);
      },
      removed({scope}) {
        self.removed('ManageSystems', scope);
      }
    });
    self.ready();
    self.onStop(() => {
      rolesHandle.stop();
    });
  } else self.ready();
});
