/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createDialogue } from "../../actions/dialogue";
import { langPairOptions } from "../common/options";

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
    //this.props.addWord(wordData, this.props.history);
    console.log(wordData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let parts = [...this.state.parts];
    parts[i] = { ...parts[i], [name]: value };
    this.setState({ parts });
  }

  handleChange2(i, e) {
    const { name, value } = e.target;
    let helpers = [...this.state.helpers];
    helpers[i] = { ...helpers[i], [name]: value };
    this.setState({ helpers });
  }

  addClick() {
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
  }

  addClick2() {
    this.setState(prevState => ({
      parts: prevState.parts.map(part => ({
          helpers: [
              ...part.helpers,
              { L1: '', L2: '' }
          ]
      }))
  }))
  }

  createUI() {
    return this.state.parts.map((el, i) => (
      <div key={i}>
        <TextFieldGroup
          placeholder="I want some cheese"
          info="type example sentence"
          name="sentence"
          value={el.sentence || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder="Я хочу сыра"
          info="type translation of example sentence in Russian"
          name="translation"
          value={el.translation || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder="Audio"
          info="type example sentence with latin"
          name="audio"
          value={el.audio}
          onChange={this.handleChange.bind(this, i)}
        />
        <TextFieldGroup
          placeholder="Give some hints to people"
          info="Give some hints to people"
          name="prompt"
          value={el.prompt}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          className="btn btn-info btn-block mt-4"
          onClick={this.removeClick.bind(this, i)}
        />
        <div>{this.createUI2(i)}</div>
      </div>
    ));
  }

  createUI2(i) {
    return this.state.parts[i].helpers.map(el => (
      <div key={i}>
        <TextFieldGroup
          placeholder="Book"
          info="type word in L1"
          name="L1"
          value={el.L1 || ""}
          onChange={this.handleChange2.bind(this, i)}
        />
        <TextFieldGroup
          placeholder="книга"
          info="type word in L2"
          name="L2"
          value={el.L2 || ""}
          onChange={this.handleChange2.bind(this, i)}
        />

        <input
          type="button"
          value="remove"
          className="btn btn-info btn-block mt-4"
          onClick={this.removeClick2.bind(this, i)}
        />
        <input
          type="button"
          value="add more"
          className="btn btn-info btn-block mt-4"
          onClick={this.addClick2.bind(this)}
        />
        <hr />
      </div>
    ));
  }

  removeClick(i) {
    let parts = [...this.state.parts];
    parts.splice(i, 1);
    this.setState({ parts });
  }

  removeClick2(i) {
    let helpers = [...this.state.parts[i].helpers];
    helpers.splice(i, 1);
    this.setState({ helpers });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-word">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Dialogue</h1>
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
                <div>{this.createUI()}</div>
                <input
                  type="button"
                  value="add more"
                  className="btn btn-info btn-block mt-4"
                  onClick={this.addClick.bind(this)}
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
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
  dialogue: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createDialogue })(
  withRouter(AddDialogue)
);
