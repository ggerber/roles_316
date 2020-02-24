import React, {PureComponent} from 'react';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ConfirmModal extends PureComponent {
  toggleModal = () => {
    const {toggle} = this.props;
    toggle();
  };

  onConfirm = () => {
    const {onconfirm} = this.props;
    onconfirm();
  };

  render = () => {
    const {isOpen, action, name} = this.props;
    return (
      <Modal isOpen={isOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>{`Confirm ${action}`}</ModalHeader>
        <ModalBody>{`Are you sure you want to ${action} ${name}?`}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onConfirm}>
            Confirm
          </Button>
          <Button color="secondary" onClick={this.toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
}

export default ConfirmModal;
