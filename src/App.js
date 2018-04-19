import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom'

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
import Userid from './routes/user-id';
import BookNew from './routes/booksnew';

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
            <Route exact path="/books/new" component={BookNew}/>
            <Route path="/books/:id" component={BooksId} />
            <UserRoute exact path="/users" authenticated={authenticated} component={Users} />
            <Route path="/users/:id" component={Userid} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default withRouter(connect(mapStateToProps)(App));
