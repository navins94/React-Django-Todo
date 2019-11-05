import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isAuthenticated){
      this.props.history.push('/')
    }
    else if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-form">
        <form onSubmit={this.onSubmit}>
            <div className="avatar">
              <img src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-8.jpg" alt="Avatar" />
            </div>
            <h2 className="text-center">Login</h2>   
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={password}
                />
            </div>        
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
        </form>
        <p className="text-center small">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
