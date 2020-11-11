import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

function ModalComp({openModal, setOpenModal}) {

  return (
    <>
      <Modal
        onClose={() => setOpenModal(!openModal)}
        onOpen={() => setOpenModal(openModal)}
        open={openModal}
      >
        <Modal.Header>Modal #1</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='right arrow' />
          </div>
          <Modal.Description>
            <p>We have more to share with you. Follow us along to modal 2</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ModalComp