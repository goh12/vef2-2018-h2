import React, { Component } from 'react';
import ReadBooks from './../../components/read-books';
import Button from './../../components/button';
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

      const results2 = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me`,
      {
        method: 'get',
        headers: {
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });

      const res2 = await results2.json();
      console.log(res2);
      localStorage.setItem('user', JSON.stringify(res2));
      window.location = '/profile';
    } catch(e) {
      console.log(e);
    }
    
  }

  async updatePassword() {
    /* Þarf að gera password '' útfa galla í API í sýnilausn Óla */

    const json = {
      name: this.state.user.name,
      password: this.state.newPassowrd,
    }

    const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me`,
      {
        method: 'patch',
        body: json,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });

    const res = await results.json();
  }

  async updateName() {
    /* Þarf að gera password '' útfa galla í API í sýnilausn Óla */

    const json = {
      name: this.state.newName,
      password: ''
    }

    const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me`,
      {
        method: 'patch',
        body: json,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });

    const res = await results.json();
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
    this.setState({
      ...this.state,
      newPassowrd: e.target.value,
    });
  }

  render() {
    if (!this.state.user) {
      return (<p>Ekki skráður inn sem notandi</p>);
    }

    const  { user } = this.state;
    return (
      <div className='profile'>
        <h2 className='profile__heading'>Upplýsingar</h2>
        {this.state.error ? (
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


        <ReadBooks id='me' token={this.state.token} />
      </div>
    );
  }
}
