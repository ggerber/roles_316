import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import Systems from '../../../../../api/collections/server/Systems';
import {globalUsers, addSpecialUsers} from '../../../specialusers';
import {populatedObject} from '../../../../../api/utils/shared/types';

const {operator, viewer} = Meteor.settings.public.planRoleMap;

const localUsers = [
  {
    first: 'Philani',
    last: 'Khumalo',
    email: 'pkhumalo@uham.com',
    password: 'pkhumalo',
    roles: viewer,
    update: {'emails.0.verified': true}
  }
];

const systemName = 'CHDM';

const load = () => {
  try {
    const chdm = Systems.findOne({systemName});
    if (!populatedObject(chdm)) {
      const newSystem = {
        name: systemName,
        createdAt: new Date().getTime()
      };

      const systemId = Systems.insert(newSystem);

      addSpecialUsers(localUsers, 'SUBSCRIPTION');
      addSpecialUsers([...globalUsers, ...localUsers], systemId);

      const {_id: userId} = Accounts.findUserByEmail(localUsers[0].email);
    }
  } catch (err) {
    console.error('load err', err);
  }
};

export default load;
