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

  async updateLocalUser() {
    const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me`,
      {
        method: 'get',
        headers: {
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });

      const res = await results.json();
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
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
      name: this.state.user.name,
      password: this.state.newPassowrd,
    }

    const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me`,
      {
        method: 'PATCH',
        body: JSON.stringify(json),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });

    const res = await results.json();
    console.log(res);
    this.setState({
      error: 'Password has been changed',
    })
  }

  async updateName() {
    /* Þarf að gera password '123456' útfa galla í API í sýnilausn Óla */
    const json = {
      name: this.state.newName,
      password: '123456'
    }

    const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/me`,
      {
        method: 'PATCH',
        body: JSON.stringify(json),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
          'Authorization': `bearer ${this.state.token}`,
        }
      });

    const res = await results.json();
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
    
    const  { error, user } = this.state;
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
          <p>* Vegna galla í sýnilausn Óla þarf að breyta passwordi eftir að breytt er nafni</p>
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
