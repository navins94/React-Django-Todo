import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodo } from "../../actions/todo";

export class Form extends Component {
  state = {
    name: ""
  };

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const post_data = { name };
    this.props.addTodo(post_data);
    this.setState({
      name: ""
    });
  };

  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Todo</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(Form);
