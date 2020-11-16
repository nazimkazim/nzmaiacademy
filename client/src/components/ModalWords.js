import React from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

function ModalComp({ openHelperModal, setOpenHelperModal, data, id }) {
  //console.log(prompt)
  //console.log(id)
  const filterPrompts = () => {
    let strip = data.filter((strip) => {
      return strip._id === id;
    });
    //console.log(strip[0]);
    return strip[0];
  };

  const List = styled.ul`
    max-width:320px;
    height:auto;
    padding:5px;
    /* background-color:red; */
    list-style-type:none;
  `

  const ListItem = styled.li`
    width:100%;
    height:auto;
    padding:3px;
    border-bottom:2px solid grey;
    font-size:1.4em;
  `

  return (
    <>
      <Modal
        onClose={ () => setOpenHelperModal(!openHelperModal) }
        onOpen={ () => setOpenHelperModal(openHelperModal) }
        open={ openHelperModal }
      >
        <Modal.Header>Helper words</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <List>{filterPrompts() && filterPrompts().helpers.map((obj) => (
            <ListItem>{obj.L1} - {obj.L2}</ListItem>
          ))}</List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalComp;