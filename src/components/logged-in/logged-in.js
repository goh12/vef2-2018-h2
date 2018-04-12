import React, { Component } from 'react';
import Button from '../button';
import { Redirect } from 'react-router';
import { loginUser, logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';

import './logged-in.css';

class LoggedIn extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = { user: JSON.parse(localStorage.getItem('user'))};
  }


  render() {
    const user = this.props.user;
    console.log(this.props);
    return(
    <div className='logged-in'>
      <a href='/profile'><img className="logged-in__image" src={user.image || '/profile.jpg'} /></a>
        <div className='logged-in__section'>
          <Button className="logged-in__button" children='Log out' onClick={() => this.props.dispatch(logoutUser())}/>
          <p className='logged-in__name'>{user.name}</p>
        </div>
    </div>
  )
    
  }
}

export default connect()(LoggedIn);


