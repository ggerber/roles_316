import {Meteor} from 'meteor/meteor';
import React, {PureComponent} from 'react';
import {ListGroupItem, Media, DropdownMenu, Dropdown, DropdownItem, DropdownToggle} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCodeBranch} from '@fortawesome/free-solid-svg-icons/faCodeBranch';

import MediaBadge from './media-badge';
import ConfirmModal from './confirm-modal';

import {populatedArray} from '../../api/utils/shared/types';

class SystemButton extends PureComponent {
  state = {
    dropdownOpen: false,
    confirmOpen: false
  };

  toggleConfirmModal = () => this.setState(prevState => ({confirmOpen: !prevState.confirmOpen}));

  toggleDropDownNull = () => this.setState(prevState => (prevState.dropdownOpen ? {dropdownOpen: false} : null));

  toggleDropDown = e => {
    e.preventDefault();
    this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}));
  };

  touchCancel = () => {
    // Handling touch events for ios, no contextmenu events for ios
    // http://jsfiddle.net/kelunik/pkjze6e6/42/
    if (this.presstimer !== null) {
      Meteor.clearTimeout(this.presstimer);
      this.presstimer = null;
    }
  };

  touchStart = e => {
    // Handling touch events for ios, no contextmenu events for ios
    const self = this;

    if (!(e.type === 'click' && e.button !== 0))
      this.presstimer = Meteor.setTimeout(() => self.toggleDropDown(e), 1000);
  };

  remove = () => {
    const {systemId} = this.props;
    Meteor.call('systems.remove', {systemId}, err => {
      if (err) throw new Meteor.Error('system.remove err', err);
    });
  };

  gotoSystem = () => {
    const {gotoSystem} = Meteor.settings.public;
    const {systemId, history} = this.props;

    // history.push(`/subscribed/system-map/${systemId}`);
    history.push(`${gotoSystem}/${systemId}`);
  };

  modifySystem = () => {
    const {systemId, name, roles, history} = this.props;
    history.push({pathname: `/subscribed/system-modify/${systemId}`, state: {name, roles}});
  };

  copySystem = () => {
    const {systemId} = this.props;
    Meteor.call('systems.copy', {systemId}, err => {
      if (err) throw new Meteor.Error('systems.copy err', err);
    });
  };

  render = () => {
    // console.log('system-button render this', this);
    const {systemId, name, roles} = this.props;
    const {dropdownOpen, confirmOpen} = this.state;

    const canManage = populatedArray(roles) && roles.includes('manage');
    const canEdit = populatedArray(roles) && roles.includes('edit');

    let dropdownmenu = null;
    const edititem = (
      <DropdownItem key="edititem" onClick={this.modifySystem}>
        Edit
      </DropdownItem>
    );

    const copyitem = (
      <DropdownItem key="copyitem" onClick={this.copySystem}>
        Copy
      </DropdownItem>
    );

    const exportitem = null;

    // const exportitem = (
    //   <DropdownItem key="exportitem" onClick={this.exportSystem}>
    //     Export
    //   </DropdownItem>
    // );

    const deleteitem = (
      <DropdownItem key="removeitem" onClick={this.toggleConfirmModal}>
        Delete
      </DropdownItem>
    );

    if (canManage) {
      dropdownmenu = (
        <DropdownMenu>
          {edititem}
          {copyitem}
          {exportitem}
          {deleteitem}
        </DropdownMenu>
      );
    } else if (canEdit) {
      dropdownmenu = <DropdownMenu>{edititem}</DropdownMenu>;
    }

    const listgroupitem = (
      <ListGroupItem key={name} action>
        <Media>
          <MediaBadge color="success">
            <FontAwesomeIcon icon={faCodeBranch} />
          </MediaBadge>
          <Media body>
            <h5>{name}</h5>
          </Media>
        </Media>
      </ListGroupItem>
    );

    return (
      <div style={{WebkitUserSelect: 'none', cursor: 'pointer'}}>
        <ConfirmModal
          isOpen={confirmOpen}
          toggle={this.toggleConfirmModal}
          action="delete"
          onconfirm={this.remove}
          name={name}
        />

        <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropDownNull}>
          <DropdownToggle
            tag="div"
            onClick={this.gotoSystem}
            onContextMenu={this.toggleDropDown}
            onTouchStart={this.touchStart}
            onTouchEnd={this.touchCancel}
            onTouchCancel={this.touchCancel}
          >
            {listgroupitem}
          </DropdownToggle>
          {dropdownmenu}
        </Dropdown>
      </div>
    );
  };
}

export default SystemButton;
