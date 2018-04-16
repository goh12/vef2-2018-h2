import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/register';
import { Link } from 'react-router-dom';
import Button from '../../components/button'

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

          <div className='login__container'>
            <label htmlFor="username" className='login__label'>Notendanafn:</label>
            <input className='login__input' id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
          </div>

          <div className='login__container'>
            <label htmlFor="password" className='login__label'>Lykilorð:</label>
            <input className='login__input' id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
          </div>

          <div className='login__container'>
            <label htmlFor="name" className='login__label'>Nafn:</label>
            <input className='login__input' id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
          </div>

          <Button className='login__button' children='Nýskrá' disabled={isFetching} />
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
