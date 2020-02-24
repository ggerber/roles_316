/* eslint max-classes-per-file: ["error", 2] */

import React, {PureComponent} from 'react';
import {Button, ListGroup, Modal, ModalHeader, ModalBody} from 'reactstrap';

import SystemButton from '../components/system-button';
import SystemAdd from '../components/system-add';

import {sortAlphabetical} from '../../api/utils/shared/sort';
import {populatedArray} from '../../api/utils/shared/types';
import Loading from '../components/loading';
import ResponsiveContainer from '../components/responsive-container';

import {AccountConsumer} from '../containers/account-context';
import {authenticateSubscription} from '../../api/utils/client/authenticate';

class SystemList extends PureComponent {
  render() {
    // console.log('systemlist render this', this);
    const {systems, roles, history} = this.props;

    const systemitems = systems
      .sort((systemA, systemB) => sortAlphabetical(systemA.name, systemB.name))
      .map(({_id, name}) => {
        return <SystemButton key={_id} systemId={_id} roles={roles[_id]} name={name} history={history} />;
      });
    return <ListGroup>{systemitems}</ListGroup>;
  }
}

export default class extends PureComponent {
  state = {
    showAddModal: false
  };

  toggleAddModal = () => this.setState(prevState => ({showAddModal: !prevState.showAddModal}));

  render = () => {
    console.log('render this', this);
    const {isloading, systems, history} = this.props;
    const {showAddModal} = this.state;

    const systemlist = (
      <AccountConsumer>
        {({roles}) => {
          const canManage = authenticateSubscription(roles, 'manage');
          const addbutton = (
            <Button key="addbutton" color="primary" block onClick={this.toggleAddModal}>
              Add System
            </Button>
          );
          const addmodal = (
            <Modal key="addmodal" isOpen={showAddModal} toggle={this.toggleAddModal}>
              <ModalHeader toggle={this.toggleAddModal}>Add System</ModalHeader>
              <ModalBody>
                <SystemAdd toggle={this.toggleAddModal} />
              </ModalBody>
            </Modal>
          );
          const breakbutton = <br key="bradd" />;
          const breakmodal = <br key="brmod" />;

          let component;
          if (isloading) component = <Loading />;
          else if (!populatedArray(systems)) {
            const message = 'No Systems';
            if (canManage) component = [addbutton, breakbutton, addmodal, breakmodal, message];
            else component = message;
          } else {
            const list = <SystemList key="systemlist" systems={systems} roles={roles} history={history} />;
            if (canManage) component = [addbutton, breakbutton, addmodal, breakmodal, list];
            else component = list;
          }
          return component;
        }}
      </AccountConsumer>
    );

    return (
      <ResponsiveContainer>
        <h1>Systems</h1>
        {systemlist}
      </ResponsiveContainer>
    );
  };
}
