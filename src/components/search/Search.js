import React, { Component } from 'react';
import Button from '../button';

import './Search.css';

export default class Search extends Component {

  state = {
    searchinput: ''
  };

  onClick = () => {
    return (e) => {
      e.preventDefault()
      console.log(this.state.searchinput);
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.searchinput);
  }

  render() {
    const { searchinput } = this.state;

    return (
        <div className='search'>
            <form onSubmit={this.handleSubmit}>
              <input className="search__input" type="text" name="searchinput" value={searchinput} onChange={this.handleInputChange} placeholder='Bókaleit'/>
              <Button className='search__button' children="Leita" />
            </form>
        </div>
    );
  }

}

