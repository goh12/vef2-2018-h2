import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Register from './routes/register';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Books from './routes/books';
import BooksId from './routes/booksid';
import BooksIdEdit from './routes/booksidedit';
import Users from './routes/users';
/* todo fleiri routes */

import './App.css';

class App extends Component {
  
  render() {
    const authenticated = localStorage.getItem('token') || false; /* vita hvort notandi sé innskráður */

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <UserRoute path="/profile" authenticated={authenticated} component={Profile} />
            <Route exact path="/register" component={Register} />
            <Route path="/books" exact component={Books} />
            <UserRoute path="/books/:id/edit" authenticated={authenticated} component={BooksIdEdit} />
            <Route path="/books/:id" component={BooksId} />
            <UserRoute path="/users" authenticated={authenticated} component={Users} />
            {/* todo fleiri route */}
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default withRouter(connect(mapStateToProps)(App));
