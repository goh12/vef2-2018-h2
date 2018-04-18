import React, { Component } from 'react';
import ReadBooks from './../../components/read-books';
import Button from './../../components/button';
import api from '../../api';

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
    const data = await api.get(`users/me/read?offset=${this.state.offset}`);
    return data;
  }

  async updateLocalUser() {
    const res = await api.get('users/me');
    console.log(res);
    
    localStorage.setItem('user', JSON.stringify(res.result));
    window.location = '/profile';
  }

  async updateImage() {
    try {
      const data = this.state.imageUpload;

      if(!data) return;

      const formData = new FormData();
      formData.append('profile', data);

      const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me/profile`,
      {
        method: 'post',
        body: formData,
        headers: {
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });
      const res = await results.json();

      if (res.error) {
        return this.setState({...this.state, error: res.error});
      }

      this.updateLocalUser();
    } catch(e) {
      console.log(e);
    }
    
  }

  async updatePassword() {
    if(this.state['newPassword'] !== this.state['newPassword2']) {
      return this.setState({
        ...this.state,
        error: 'Password fields need to match',
      });
    }

    if(this.state['newPassword'].length < 6) {
      return this.setState({
        ...this.state,
        error: 'Password must be longer than 6 letters',
      });
    }

    const json = {
      password: this.state.newPassword,
    }

    await api.patch(`users/me`, json);

    this.setState({
      error: 'Password has been changed',
    })
  }

  async updateName() {
    const json = {
      name: this.state.newName
    }

    await api.patch(`users/me`,json);
    this.updateLocalUser();
  }

  handleImageInputChange(e) {
    this.setState({
      ...this.state,
      imageUpload: e.target.files[0],
    });
  }

  handleNameInputChange(e) {
    this.setState({
      ...this.state,
      newName: e.target.value,
    });
  }

  handlePasswordInputChange(e) {
    const { name, value } = e.target;
                  
    if (name) {
      return this.setState({ [name]: value });
    }
  }

  render() {
    if (!this.state.user) {
      return (<p>Ekki skráður inn sem notandi</p>);
    }
    
    const  { error } = this.state;
    
    return (
      <div className='profile'>
        <h2 className='profile__heading'>Upplýsingar</h2>
        {error ? (
          <p> {this.state.error} </p>
        ) : (
          ''
        )}
        <form className='profile__form' method='post'>
          <input type='file' accept='.jpg, .png' onChange={(e) => this.handleImageInputChange(e)} />
          <Button  children='Uppfæra mynd' onClick={(e) => {
            e.preventDefault();
            this.updateImage()}
          }/>
        </form>

        <form className='profile__form' method='patch'>
          <label>Nafn:</label>
          <input type='text' onChange={(e) => this.handleNameInputChange(e)} />
          <br />
          <Button  children='Uppfæra nafn' onClick={(e) => {
            e.preventDefault();
            this.updateName()}
          }/>
        </form>


        <form className='profile__form' method='patch'>
          <label>Lykilorð:</label>
          <input type='password' name='newPassword' onChange={(e) => this.handlePasswordInputChange(e)} />
          <br />
          <label>Lykilorð aftur:</label>
          <input type='password' name='newPassword2' onChange={(e) => this.handlePasswordInputChange(e)} />
          <br />
          <Button  children='Uppfæra lykilorð' onClick={(e) => {
            e.preventDefault();
            this.updatePassword()}
          }/>
        </form>

        <ReadBooks id='me' token={this.state.token} />
      </div>
    );
  }
}
