import React, { Component } from 'react';

import './read-books.css';

export default class ReadBooks extends Component {
  
  constructor(props) {
    super(props );

    this.state = {
      isLoading: true,
      offset: 0,
      items: null,
    }
  }

  async getReadBooks() {
    console.log("Hellos");
    const results = await fetch(`https://vef2-2018-h1-synilausn-fgg.herokuapp.com/users/${this.props.id}/read?offset=${this.state.offset}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
        'Authorization': `bearer ${this.props.token}`,
      }
    });

    const read = await results.json();
    
    if(read.error) {
      return this.setState({
        ...this.state,
        isLoading: false,
        readError: read.error,
      });
    }

    this.setState({
      isLoading: false,
      prevOffset: this.state.offset,
      offset: read.offset,
      nextOffset: read.offset + read.limit,
      items: read.items,
    });
  }

  componentDidMount() {
      this.getReadBooks();
  }


  render() {
    if(this.state.isLoading) {
      return (<p>Sæki gögn</p>)
    }

    if(this.state.readError) {
      console.log(this.state.readError);
      return (<p>Villa</p>)
    }

    const { items } = this.state;
    if (items.length > 1) {
      return (
        <ul>
          {items.map((book) => {
            return (
              <React.Fragment>
              <li>book.title</li>
              <li>book.review</li>
              </React.Fragment>
            )
          })}
        </ul>
      );
    }

    else {
      return (<p>Engar lesnar bækur :(</p>);
    }
  }
}
