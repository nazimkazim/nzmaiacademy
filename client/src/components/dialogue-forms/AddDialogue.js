/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { Container, Grid, Input, Form, Label, Select } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createDialogue } from "../../actions/dialogue";
import { langPairOptions } from "../common/options";
import DialogPart from "./DaialogPart";

class AddDialogue extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
      ],
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const wordData = {
      langPair: this.state.langPair,
      note: this.state.note,
      description:this.state.description,
      parts: this.state.parts
    };
    this.props.createDialogue(wordData, this.props.history);
    console.log(wordData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, parts } = this.state;
    const onChangePart = (index, part) => {
      const newParts = parts.filter(() => true);
      //update part by index
      newParts[index] = part;

      this.setState({ parts: newParts });
    };
    const onAddPart = () => {
      this.setState(prevState => ({
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
      const newParts = parts.filter((value, cIndex) => cIndex !== index);
      this.setState({ parts: newParts });
    };

    return (
      <Container>
        <Grid centered columns={ 2 }>
          <Grid.Column>
            <div className="margin-top"/>
            <Link to="/dashboard" className="ui button primary ">
              Go Back
            </Link>
            <h1 className="has-text-centered">Add Dialogue</h1>
            <Form onSubmit={ this.onSubmit }>
              <Form.Field>
                <SelectListGroup 
                  placeholder="English"
                  name="langPair"
                  value={ this.state.langPair }
                  onChange={ this.onChange }
                  options={ langPairOptions } />
                  { errors.langPair &&
                  <Label pointing>{errors.langPair}</Label> }
              </Form.Field>
              <Form.Field>
                <Input
                  error 
                  placeholder='Present perfect is used....'
                  name="note"
                  value={ this.state.note }
                  onChange={ this.onChange }
                  error={ errors.note } />
                { errors.note &&
                  <Label pointing>Please enter a value</Label> }
              </Form.Field>
              <Form.Field>
                <Input
                  error 
                  placeholder="This dialogue is intended to practice..."
                  name="description"
                  value={ this.state.description }
                  onChange={ this.onChange }
                  error={ errors.description } 
                />
                { errors.description &&
                  <Label pointing>Please enter a value</Label> }
              </Form.Field>
              <div>{ parts.map((part, index) => <DialogPart part={ part } onChange={ onChangePart.bind(null, index) } onRemove={ onRemovePart.bind(null, index) } />) }</div>
              <button
                type="button"
                className="ui button primary" 
                onClick={ onAddPart }
              >add more</button>
              <button
                type="submit"
                className="ui button primary"
              >Submit</button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

AddDialogue.propTypes = {
  createDialogue: PropTypes.func.isRequired,
  dialogue: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dialogue: state.dialogue,
  errors: state.errors
});

export default connect(mapStateToProps, { createDialogue })(
  withRouter(AddDialogue)
);
