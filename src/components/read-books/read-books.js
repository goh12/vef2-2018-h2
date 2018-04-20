import React, { Component } from 'react';
import Button from '../button';
import api from '../../api';

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
    const data = await api.get(`users/${this.props.id}/read?offset=${this.state.offset}`);
    const read = data.result;
    
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
  
  async deleteReview(e, id) {
    try {
      await api.del(`users/me/read/${id}`);
      this.getReadBooks();
    } catch (err) {
      console.log(err);
    } 
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
    if (items.length > 0) {
      return (
        <ul>
          {items.map((book) => {
            return (
              <React.Fragment key={book.id}>
              <li>
              <h3>{book.title} - {book.rating}</h3>
              <p>{book.review}</p>
              </li>
              {this.props.id === 'me' && (
                <Button className='button' children='Eyða' onClick={async (e) => this.deleteReview(e, book.id)} />
              )}
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
