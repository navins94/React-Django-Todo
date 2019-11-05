import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodoById, updateTodo } from "../../actions/todo";
export class UpdateTodo extends Component {
  state = {
    name: "",
    isComplete: "",
    created_at: "",
    id: ""
  };

  componentDidMount() {
    if (this.props.location && this.props.location.query)
      this.props.getTodoById(this.props.location.query.id);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateTodo(this.state, this.props.history);
  };

  onChange = e => {
    if (e.target.name === "name") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.checked });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo) {
      this.setState({
        name: nextProps.todo.name,
        isComplete: nextProps.todo.isComplete,
        id: nextProps.todo.id,
        created_at: nextProps.todo.created_at
      });
    }
  }

  render() {
    const { todo } = this.props;
    let content = null;
    if (Object.keys(todo).length > 0) {
      content = (
        <div className="card card-body mt-4 mb-4">
          <h2>Update Todo</h2>
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
              <label>Complete</label>
              <input
                className="form-control"
                type="checkbox"
                name="isComplete"
                onChange={this.onChange}
                defaultChecked={this.state.isComplete}
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

    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  todo: state.todos.todo
});

export default connect(
  mapStateToProps,
  { updateTodo, getTodoById }
)(UpdateTodo);
