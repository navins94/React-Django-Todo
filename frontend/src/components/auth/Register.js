import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { sendNotification } from "../../utility/Helper";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    comfirm_password: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, comfirm_password } = this.state;
    if (password !== comfirm_password) {
    sendNotification('Passwords do not match')
    } else {
      const newUser = {
        username,
        password,
        email
      };
      this.props.register(newUser,this.props.history);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }

  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.history.push('/')
    }
  }

  render() {
   
    const { username, email, password, comfirm_password } = this.state;
    return (
      <div className="login-form">
        <form onSubmit={this.onSubmit}>
            <div className="avatar">
              <img src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-8.jpg" alt="Avatar" />
            </div>
            <h2 className="text-center">Register</h2>   
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
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="comfirm_password"
                placeholder="Confirm password"
                onChange={this.onChange}
                value={comfirm_password}
              />
            </div>        
            <div className="form-group">
                <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            </div>
        </form>
        <p className="text-center small">Already have an account? <Link to="/login">Login</Link></p>
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
  { register }
)(withRouter(Register));
