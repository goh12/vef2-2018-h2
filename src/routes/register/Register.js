import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/register';
import { Link } from 'react-router-dom';
import Button from '../../components/button'

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

  render() {
    const { username, password, name } = this.state;
    const { isFetching, message, registered } = this.props;

    if (isFetching) {
      return (
        <p>Bý til notenda <em>{username}</em>...</p>
      );
    }

    if (registered) {
      return (
        <div>
          <h2>Nýskráning tókst!</h2>
          <p><Link to='/login'>Innskráning</Link></p>
        </div>
      );
    }
    
    return (
      <div className="register">
        <h2 className="register__heading">Nýskráning</h2>

        {typeof(message) === "object" ? (
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

          <Button className='button' children='Nýskrá' disabled={isFetching} />
        </form>
        <p><Link to="login">Innskráning</Link></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.register.isFetching,
    message: state.register.message,
    registered: state.register.registered,
  }
}

export default connect(mapStateToProps)(Register);
