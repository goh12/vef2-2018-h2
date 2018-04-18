import React, { Component } from 'react';
import api from '../../api';
import Button from '../button';

import './book-read.css';

export default class Review extends Component {
  constructor(props) {
    super(props);
    const { book } = this.props;

    const review = {
      bookId: book.id,
      rating: 1,
      review: '',
    }

    this.state = {
      token: localStorage.getItem('token'),
      review
    }
  }
    
  async postRead(body) {
    await api.post('users/me/read', this.state.review);
    this.props.toggleReview();
  }

  handleSelectionChange(e) {
    const review = {
      ...this.state.review,
      rating: parseInt(e.target.value, 10),
    }

    this.setState({
      token: this.state.token,
      review
    })

  }
  
  handleTextAreaChange(e) {
    const review = {
      ...this.state.review,
      review: e.target.value,
    }

    this.setState({
      token: this.state.token,
      review
    })
  }


  render() {
    return (
    <div className='review'>
      <form>
        <label>Um bók:</label><br/> 
        <textarea rows='10' cols='60' type="textarea" className="review__about" onChange={e => this.handleTextAreaChange(e)}/>
        <br />
        <label>Einkunn:</label><br/>
        <select className='review__rating' onChange={e => this.handleSelectionChange(e)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </form>
      <Button className='review__save' children='Vista' onClick={this.postRead.bind(this)}/>
      <Button className='review__quit' children='Hætta við' onClick={(e) => this.props.toggleReview(e)}/>
    </div>
    )

  } 
};

