import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';


/* todo sækja actions frá ./actions */
import './Register.css';

class Register extends Component {
  state = {
    username: '',
    password: '',
    name: ''
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password, name } = this.state;

    dispatch(createUser(username, password, name));
  }

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { username, password, name } = this.state;
    const { isFetching, isAuthenticated, message } = this.props;

    if (isAuthenticated) {
      return (
        <button onClick={this.handleLogout}>Útskrá</button>
      );
    }

    if (isFetching) {
      return (
        <p>Bý til notenda <em>{username}</em>...</p>
      );
    }

    return (
      <div className="register">
        <h2 className="register__heading">Nýskráning</h2>

        {typeof(message) == "object" ? (
          <ul>{message.map((message, i) => (
            <li key={i}>
              {message}
            </li>
          ))}</ul>
        ) : ('')}

        <form onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="username">Notendanafn:</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="password">Lykilorð:</label>
            <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
          </div>

          <div>
            <label htmlFor="name">Nafn:</label>
            <input id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
          </div>

          <button className='button' disabled={isFetching}>Nýskrá</button>
        </form>
        <p><Link to="login">Innskráning</Link></p>
      </div>
    );
  }
}

/* todo tengja við redux */
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Register);
