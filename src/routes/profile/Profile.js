import React, { Component } from 'react';

import './profile.css';

export default class Profile extends Component {

  render() {
    let user = localStorage.getItem('user');
    if (!user) {
      return (<p>Ekki skráður inn sem notandi</p>);
    }

    user = JSON.parse(user);
    return (
      <div className='profile'>
        <img className="profile__image" src={user.image || '/profile.jpg'} />
        <p className='profile__name'>{user.name}</p>
        <h2>Lesnar bækur</h2>
        <ul></ul>
      </div>
    );
  }
}
