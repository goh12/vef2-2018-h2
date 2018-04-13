import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';

import './Search.css';

export default class Search extends Component {

  state = {
    searchinput: ''
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { value } = this.state;
    this.setState({ searchinput: value });
  }

  render() {
    const { searchinput } = this.state;

    return (
        <div className='search'>
          <form onSubmit={this.handleSubmit}>
            <input className="search__input" type="text" name="searchinput" value={searchinput} onChange={this.handleInputChange} placeholder='Bókaleit'/>
            <Link to={{ pathname: '/books', search: `${searchinput}` }}><Button className='search__button' children="Leita" /></Link>
          </form>
        </div>
    );
  }

}

