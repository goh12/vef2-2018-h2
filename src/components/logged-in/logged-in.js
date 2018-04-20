import React, { Component } from 'react';
import Button from '../button';
import { logoutUser } from '../../actions/auth';
import { connect } from 'react-redux';

import './logged-in.css';

class LoggedIn extends Component {

  constructor(props) {
    super(props);

    this.state = { user: JSON.parse(localStorage.getItem('user'))};
  }


  render() {
    const user = this.props.user;

    return(
    <div className='logged-in'>
      <a href='/profile'><img alt='profile' className="logged-in__image" src={user.image || '/profile.jpg'} /></a>
        <div className='logged-in__section'>
          <p className='logged-in__name'>{user.name}</p>
          <Button className="logged-in__button" children='Logout' onClick={() => {
              this.props.dispatch(logoutUser())
              window.location = '.';
            }}/>
        </div>
    </div>
  )

  }
}

export default connect()(LoggedIn);
