import React, { Component } from 'react';
import ReadBooks from './../../components/read-books';
import './profile.css';

export default class Profile extends Component {
  
  constructor() {
    super();
    let user = localStorage.getItem('user');
    user = user ? JSON.parse(user) : user;
    
    const token = localStorage.getItem('token');

    this.state = {
      user,
      token,
    }
  }



  async getReadBooks() {
    return fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me/read?offset=${this.state.offset}`,
    {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
        'Authorization': `bearer ${this.state.token}`,
      }
    })
  }

  async onComponentDidMount() {
    	
  }

  render() {
    if (!this.state.user) {
      return (<p>Ekki skráður inn sem notandi</p>);
    }

    const  { user } = this.state;
    return (
      <div className='profile'>
        <img className="profile__image" src={user.image || '/profile.jpg'} />
        <p className='profile__name'>{user.name}</p>
        <h2>Lesnar bækur</h2>
        <ReadBooks id='me' token={this.state.token} />
      </div>
    );
  }
}
