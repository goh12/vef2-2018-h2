import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';
import Button from '../../components/button';
import Review from '../../components/book-read';

import './BooksId.css';

export default class BookRead extends Component {
    
  constructor(props) {
    super(props);
    let user = localStorage.getItem('user');
    user = user ? JSON.parse(user) : null;

    this.state = {
      data: null,
      loading: true,
      page: 1,
      review: false,
      user
    }
  }
    
    async componentDidMount() {
        const { id } = this.props.match.params
        this.fetchBook(id);
    }
      
    fetchBook = async (id) => {
        try {
            const data = await api.get(`books/${id}`);
            this.setState({ data, loading: false });
                        
            if (data.result.error) {
                this.setState({ error: true });
            }

        } catch (error) {
            console.error(error);
            this.setState({ error: true, loading: false });            
        }
    }

    toggleReview() {
      this.setState(
        {
          ...this.state,
          review: !this.state.review,
        }
      )
    }

    renderBottom() {
      if (!this.state.review) {
        return (
          <React.Fragment>
          { this.state.user && (
            <div className='booksid__nav-1'>
              <Button className='button' onClick={this.toggleReview.bind(this)}>Skrá lestur</Button>
            </div>
          )}
          </React.Fragment>
        )
      }
      const { data } = this.state;
      return (
        <React.Fragment>
          <Review book={data.result} toggleReview={this.toggleReview.bind(this)}/>
        </React.Fragment>
      )
      
    }
    
    render() {
        
        const { data, loading, error } = this.state;

        if (loading) {
            return(<p>Sæki bók ...</p>);
        }

        if (error) {
            return(<p>Villa við að sækja bók</p>);
        }
        
        return (
        <div className='booksid'>
            {data.result && (
                <ul className='booksid__container' key={data.result.id}>
                    <li className='booksid__item__title'>
                        {data.result.title}                       
                    </li>
                    <li className='booksid__item'>
                       Eftir {data.result.author}
                    </li>
                    <li className='booksid__item'>
                       ISBN13 {data.result.isbn13}
                    </li>
                    <li className='booksid__item'>
                       {data.result.categorytitle}
                    </li>
                    <li className='booksid__item'>
                       {data.result.description}
                    </li>
                    <li className='booksid__item'>
                       {data.result.pagecount} síður
                    </li>
                    <li className='booksid__item'>
                        Gefin út {data.result.published}
                    </li>
                    <li className='booksid__item'>
                       Tungumál: {data.result.language}
                    </li>
                    { !this.state.review && (<li className='booksid__item' key='link'>
                       <Link to={`/books/${data.result.id}/edit`}>Breyta bók</Link>
                    </li>)}
                </ul>
            )}

            {this.renderBottom()}
            <div className='booksid__nav-2'>
                <Link className='button' to='/books'>Til baka</Link>
            </div>
        </div>
        );
    } 
};

