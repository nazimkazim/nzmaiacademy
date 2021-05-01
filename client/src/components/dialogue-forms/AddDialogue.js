import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextField, FormControl, InputLabel, FormHelperText, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";

import { createDialogue } from "../../actions/dialogue";
import { langPairOptions } from "../common/options";
import DialogPart from "./DaialogPart";

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

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
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
    },
    onSubmit: (values) =>
      props.createDialogue(dialog, props.history)
  });

  const [dialog, setDialog] = useState({
    langPair: "",
    note: "",
    description: "",
    parts: [
      {
        sentence: "",
        translation: "",
        speaker: "",
        audio: "",
        prompt: "",
        helpers: [{ L1: "", L2: "" }]
      }
    ]
  });

  const handlePartChange = (index) => (event) => {
    const { value, name } = event.target;
    const updatedPart = {
      ...values.parts[index],
      [name]: value,
    };
    setFieldValue(`parts[${index}]`, updatedPart);
  };

  const setupPartHelpersChangeHandler = (index) => (updatedHelpers) => {
    setFieldValue(`parts[${index}].helpers`, updatedHelpers);
  };

  const onAddPart = () => {
    const newPart = {
      sentence: "",
      translation: "",
      audio: "",
      prompt: "",
      helpers: [{ L1: "", L2: "" }]
    };
    setFieldValue("parts", [...values.parts, newPart]);
  };

  const onRemovePart = (removedPartIndex) => {
    setFieldValue("parts", values.parts.filter((part, index) => index !== removedPartIndex));
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
          <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit }>
            <InputLabel htmlFor="language-pair">Language pair</InputLabel>
            <Select
              native
              name="langPair"
              value={ values.langPair }
              onChange={ handleChange }
              onBlur={ handleBlur }
            >
              <option aria-label="None" value="" />
              { langPairOptions.map(item => {
                return (
                  <option key={ item.id } value={ item.value }>{ item.value }</option>
                );
              }) }
            </Select>

            <InputLabel htmlFor="note">Note</InputLabel>
            <TextField id="note" label="Present perfect is used to indicate that..." name="note" value={ values.note } onChange={ handleChange } onBlur={ handleBlur } />

            <InputLabel htmlFor="description">Description</InputLabel>
            <TextField id="description" label="In this dialog you will learn..." name="description" value={ values.description } onChange={ handleChange } />

            <div>{ values.parts.map((part, index) => <DialogPart part={ part } onChange={ handlePartChange(index) } onRemove={ onRemovePart.bind(null, index) } handlePartHelpersChange={ setupPartHelpersChangeHandler(index) } />) }</div>
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
