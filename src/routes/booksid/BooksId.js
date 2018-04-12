import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';

import './BooksId.css';

export default class BooksId extends Component {
    
    state = {
        data: null,
        loading: true,
        page: 1
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
    
    render() {
        
        const { data, loading, error, page } = this.state;

        if (loading) {
            return(<p>Sæki bók ...</p>);
        }

        if (error) {
            return(<p>Villa við að sækja bók</p>);
        }
        
        return (
        <div className='booksid'>
            {data.result && (
                <ul className='booksid__container'>
                    <li className='booksid__item__title' key={data.result.title}>
                        {data.result.title}                       
                    </li>
                    <li className='booksid__item' key={data.result.author}>
                       Eftir {data.result.author}
                    </li>
                    <li className='booksid__item' key={data.result.isbn13}>
                       ISBN13 {data.result.isbn13}
                    </li>
                    <li className='booksid__item' key={data.result.categorytitle}>
                       {data.result.categorytitle}
                    </li>
                    <li className='booksid__item' key={data.result.description}>
                       {data.result.description}
                    </li>
                    <li className='booksid__item' key={data.result.pagecount}>
                       {data.result.pagecount} síður
                    </li>
                    <li className='booksid__item' key={data.result.published}>
                        Gefin út {data.result.published}
                    </li>
                    <li className='booksid__item' key={data.result.language}>
                       Tungumál: {data.result.language}
                    </li>
                    <li className='booksid__item' key='link'>
                       <Link to={`/books/${data.result.id}/edit`}>Breyta bók</Link>
                    </li>
                </ul>
            )}
            <div className='booksid__nav-1'>
                <Link className='button' to='/books/new'>Skrá lestur</Link>
            </div>
            <div className='booksid__nav-2'>
                <Link className='button' to='/books'>Til baka</Link>
            </div>

        </div>
        );
    } 
};

