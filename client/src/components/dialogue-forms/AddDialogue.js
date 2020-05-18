/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createDialogue } from "../../actions/dialogue";
import { langPairOptions } from "../common/options";
import DialogPart from "./DaialogPart";

class AddDialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langPair: "",
      note: "",
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

      this.setState({parts: newParts});
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
      this.setState({parts: newParts});
    };

    return (
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths
is-offset-one-fifth">
              <Link to="/dashboard" className="button is-primary">
                Go Back
              </Link>
              <h1 className="has-text-centered">Add Dialogue</h1>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="English-Russian"
                  name="langPair"
                  value={this.state.langPair}
                  onChange={this.onChange}
                  error={errors.langPair}
                  options={langPairOptions}
                />
                <TextFieldGroup
                  placeholder="Present perfect is used...."
                  info="explain some concepts"
                  name="note"
                  value={this.state.note}
                  onChange={this.onChange}
                  error={errors.note}
                />
                <div>{parts.map((part, index) => <DialogPart part={part} onChange={onChangePart.bind(null, index)} onRemove={onRemovePart.bind(null, index)}/>)}</div>
                <button
                  type="button"
                  className="button is-primary"
                  onClick={onAddPart}
                >add more</button>
                <button
                  type="submit"
                  className="button is-primary"
                >Submit</button>
              </form>
            </div>
          </div>
        </div>
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
