import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import './Header.css';
import LoggedIn from '../logged-in';

class Header extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  render() {
    let user = localStorage.getItem('user');
    user = user ? JSON.parse(user) : null;

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <Button onClick={this.onClick}>Leita</Button>

        {user ? 
        <LoggedIn user={user} /> :
        <Button children="Innskráning" onClick={() => window.location = '/login'} >Innskráning</Button>
        }
        
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);