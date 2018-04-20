import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';
import Button from '../../components/button'
import Helmet from 'react-helmet';


/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
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
    const { username, password } = this.state;

    dispatch(loginUser(username, password));
  }

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { username, password } = this.state;
    const { isFetching, isAuthenticated, message } = this.props;

    if (isAuthenticated) {
      return window.location = '/';
    }

    if (isFetching) {
      return (
        <p>Skrái inn <em>{username}</em>...</p>
      );
    }
    
    return (
      <div className="login">
        <Helmet title={`Innskráning`} />
        <h2 className="login__heading">Innskráning</h2>

        {typeof(message) === "string" ? (
          <p>{message}</p>
        ) : ('') }


        <form onSubmit={this.handleSubmit}>

          <div className='login__container'>
            <label htmlFor="username" className='login__label'>Notendanafn:</label>
            <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} className='login__input' />
          </div>

          <div className='login__container'>
            <label htmlFor="password" className='login__label'>Lykilorð:</label>
            <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} className='login__input' />
          </div>

          <Button className='login__button' children='Innskrá' disabled={isFetching} />
        </form>
        <p><Link to="register">Nýskráning</Link></p>
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

export default connect(mapStateToProps)(Login);
