import React from 'react';
import { Modal } from 'semantic-ui-react';

function ModalComp({ openInfoModal, setOpenInfoModal, data, id }) {
  //console.log(prompt)
  //console.log(id)
  const filterPrompts = () => {
    let strip = data.filter((strip) => {
      return strip._id === id;
    });
    //console.log(strip[0]);
    return strip[0];
  };

  return (
    <>
      <Modal
        onClose={ () => setOpenInfoModal(!openInfoModal) }
        onOpen={ () => setOpenInfoModal(openInfoModal) }
        open={ openInfoModal }
      >
        <Modal.Header color='red'>Useful tips</Modal.Header>
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