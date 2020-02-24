/* eslint max-classes-per-file: ["error", 2] */

import {Meteor} from 'meteor/meteor';
import React, {PureComponent} from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Roles} from 'meteor/alanning:roles';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDatabase} from '@fortawesome/free-solid-svg-icons/faDatabase';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

import Loading from './loading';
import {isString} from '../../api/utils/shared/types';
import matchPermissions from '../../api/utils/shared/permissions';

class NavigationBar extends PureComponent {
  state = {
    isOpen: false
  };

  toggleNavbar = () => this.setState(prevState => ({isOpen: !prevState.isOpen}));

  logout = () => Meteor.logout();

  render = () => {
    // console.log('render this', this);
    const {systemId, name} = this.props;
    const {isOpen} = this.state;

    const user = Meteor.user();
    const subscriptionPermissions = matchPermissions(Roles.getRolesForUser(Meteor.userId(), 'SUBSCRIPTION'));

    const menunav = isString(systemId) ? (
      <Nav navbar>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/subscribed/systems">
            <FontAwesomeIcon icon={faDatabase} fixedWidth />
            Systems
          </NavLink>
        </NavItem>
      </Nav>
    ) : null;

    let accountsystempermissions = null;
    if (isString(systemId)) {
      const systemPermissions = matchPermissions(Roles.getRolesForUser(Meteor.userId(), systemId));
      accountsystempermissions = <DropdownItem disabled>{`${name}: ${systemPermissions}`}</DropdownItem>;
    }

    const accountnav = (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown inNavbar>
          <DropdownToggle data-toggle="dropdown" nav caret>
            <FontAwesomeIcon icon={faUser} fixedWidth />
            {user && 'emails' in user ? user.emails[0].address : null}
          </DropdownToggle>

          <DropdownMenu right>
            <DropdownItem disabled>{`Subscription: ${subscriptionPermissions}`}</DropdownItem>
            {accountsystempermissions}
            <DropdownItem divider />
            <DropdownItem onClick={this.logout}>
              <FontAwesomeIcon icon={faSignOutAlt} fixedWidth />
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );

    return (
      <Navbar color="light" light expand="lg">
        <NavbarBrand>{name}</NavbarBrand>

        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          {menunav}
          {accountnav}
        </Collapse>
      </Navbar>
    );
  };
}

export default class extends PureComponent {
  render = () => {
    const {isloading, systemId, name} = this.props;

    let component;
    if (isloading) component = <Loading />;
    else component = <NavigationBar key={systemId} systemId={systemId} name={name} />;
    return component;
  };
}
