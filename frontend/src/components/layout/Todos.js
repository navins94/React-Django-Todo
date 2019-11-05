import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodos, deleteTodo } from "../../actions/todo";
import { Link } from "react-router-dom";

export class Todos extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    getTodos: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  };

  
  componentDidMount() {
    this.props.getTodos();
  }
  render() {
    return (
      <Fragment>
        {this.props.todos.length > 0 ? (
          <div>
            <h2>Todos</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Complete</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.todos.map(todo => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td>{todo.created_at}</td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="isComplete"
                        defaultChecked={todo.isComplete}
                      ></input>
                    </td>
                    <td>
                      <button
                        onClick={this.props.deleteTodo.bind(this, todo.id)}
                        className="btn btn-danger btn-sm"
                      >
                        {" "}
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/todo/${todo.id}`,query:{id: todo.id}
                        }}
                        className="btn btn-success btn-sm"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-primary">NO Todos Created yet.</div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos.todos
});

export default connect(
  mapStateToProps,
  { getTodos, deleteTodo }
)(Todos);
