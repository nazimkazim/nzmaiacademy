import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

function ModalComp({ openModal, setOpenModal, data, id }) {
  //console.log(prompt)
  //console.log(id)
  const filterPrompts = () => {
    let strip = data.filter((strip) => {
      return strip._id === id;
    });
    console.log(strip[0]);
    return strip[0];
  };

  return (
    <>
      <Modal
        onClose={ () => setOpenModal(!openModal) }
        onOpen={ () => setOpenModal(openModal) }
        open={ openModal }
      >
        <Modal.Header>Useful tips</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <p>{filterPrompts() && filterPrompts().prompt}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalComp;