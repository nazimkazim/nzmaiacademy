/* eslint-disable react/no-direct-mutation-state */
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createDialogue } from "../../actions/dialogue";
import { langPairOptions } from "../common/options";
import DialogPart from "./DaialogPart";
import { TextField, FormControl, InputLabel, FormHelperText, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

function AddDialogue(props) {
  const classes = useStyles();
  const [dialog, setDialog] = useState({
    langPair: "",
    note: "",
    description: "",
    parts: [
      {
        sentence: "",
        translation: "",
        audio: "",
        prompt: "",
        helpers: [{ L1: "", L2: "" }]
      }
    ]
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const wordData = {
      langPair: dialog.langPair,
      note: dialog.note,
      description: dialog.description,
      parts: dialog.parts
    };
    props.createDialogue(wordData, props.history);
    //console.log(wordData);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setDialog(prevValues => ({ ...prevValues, [name]: value }));
  };

  const onChangePart = (index, part) => {
    setDialog(prevState => {
      const newParts = prevState.parts.filter(() => true);
      //update part by index
      newParts[index] = part;
      return { ...prevState, parts: newParts };
    });
  };
  const onAddPart = () => {
    setDialog(prevState => ({
      ...prevState,
      parts: [
        ...prevState.parts,
        {
          sentence: "",
          translation: "",
          audio: "",
          prompt: "",
          helpers: [{ L1: "", L2: "" }]
        }
      ]
    }));
  };
  const onRemovePart = (index) => {
    //remove part by index
    setDialog((prevValues) => ({ ...prevValues, parts: prevValues.parts.filter((value, cIndex) => cIndex !== index) }));
  };

  return (
    <Container>
      <Grid centered columns={ 2 }>
        <Grid.Column>
          <div className="margin-top" />
          <Link to="/dashboard" className="ui button primary ">
            Go Back
            </Link>
          <h1 className="has-text-centered">Add Dialogue</h1>
          {/* <Form onSubmit={ onSubmit }>
            <Form.Field>
              <SelectListGroup
                placeholder="English"
                name="langPair"
                value={ dialog.langPair }
                onChange={ onChange }
                options={ langPairOptions } />
            </Form.Field>
            <Form.Field>
              <Input
                error
                placeholder='Present perfect is used....'
                name="note"
                value={ dialog.note }
                onChange={ onChange }
              />
            </Form.Field>
            <Form.Field>
              <Input
                error
                placeholder="This dialogue is intended to practice..."
                name="description"
                value={ dialog.description }
                onChange={ onChange }
              />
            </Form.Field>
            <div>{ dialog.parts.map((part, index) => <DialogPart part={ part } onChange={ () => onChangePart(null, index) } onRemove={ onRemovePart.bind(null, index) } />) }</div>
            <button
              type="button"
              className="ui button primary"
              onClick={ onAddPart }
            >add more</button>
            <button
              type="submit"
              className="ui button primary"
            >Submit</button>
          </Form> */}
          <form className={ classes.root } noValidate autoComplete="off">
            <InputLabel htmlFor="language-pair">Language pair</InputLabel>
            <Select
              native
              value={ dialog.langPair }
              onChange={ onChange }
              inputProps={ {
                name: 'age',
                id: 'language-pair',
              } }
            >
              <option aria-label="None" value="" />
              { langPairOptions.map(item => {
                console.log(item.id);
                return (
                  <option key={ item.id } value={ item.value }>{ item.value }</option>
                );
              }) }
            </Select>
            <InputLabel htmlFor="note">Note</InputLabel>
            <TextField id="note" label="Present perfect is used to indicate that..." />
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextField id="description" label="In this dialog you will learn..." />
            <div>{ dialog.parts.map((part, index) => <DialogPart part={ part } onChange={ () => onChangePart(null, index) } onRemove={ onRemovePart.bind(null, index) } />) }</div>
            <button
              type="button"
              className="ui button primary"
              onClick={ onAddPart }
            >add more</button>
            <button
              type="submit"
              className="ui button primary"
            >Submit</button>
          </form>
        </Grid.Column>
      </Grid>
    </Container>
  );

}

AddDialogue.propTypes = {
  createDialogue: PropTypes.func.isRequired,
  dialogue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dialogue: state.dialogue
});

export default connect(mapStateToProps, { createDialogue })(
  withRouter(AddDialogue)
);
