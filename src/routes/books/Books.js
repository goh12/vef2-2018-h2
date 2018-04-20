import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Button from '../../components/button'

import './Books.css';

export default class Books extends Component {
  state = {
      data: null,
      loading: true,
      offset: 0,
      page: 1,
      lastState: null,
  }

    async componentDidMount() {
        this.fetchBooks(this.props.location.search);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset || this.props.location.search !== prevProps.location.search) {
          if(this.props.location.search !== prevProps.location.search) {
            return this.setState({
              ...this.state,
              page: 1,
              offset: 0
            });
          }
            this.fetchBooks(this.props.location.search);
        }
    }

    componentWillReceiveProps(nextProps) {
      this.fetchBooks(nextProps.location.search);
    }

    fetchBooks = async (search) => {
        try {
            const { offset } = this.state;

            const data = await api.get(`books?offset=${offset}&search=${search.replace(/[?]+/g, '')}`);
            this.setState({ data, loading: false });
        } catch (error) {
            console.error(error);
            this.setState({ error: true, loading: false });
        }
    }

    clickHandlerNext = () => {
        return (e) => {
          e.preventDefault();

          const { offset, page } = this.state;

          this.setState({ offset: offset+10, page: page+1, loading: true });
        }
    }

    clickHandlerPrev = () => {
        return (e) => {
          e.preventDefault();

          const { offset, page } = this.state;

          this.setState({ offset: offset-10, page: page-1, loading: true });
        }
    }

    render() {
        const { data, loading, error, offset, page } = this.state;

        if (loading) {
            return(<p>Sæki bækur...</p>);
        }

        if (error) {
            return(<p>Villa við að sækja bækur</p>);
        }

        return (
        <div className='books'>
            <h2>Bækur</h2>
            {data.result.items && (
                <ul className='books__container'>{data.result.items.map((book, i) => (
                    <li className='books__item' key={book.title}>
                        <Link to={`/books/${book.id}`}>
                            <div className='books__item__title'>
                            {book.title}
                            </div>
                            <div className='books__item__author'>
                            {book.author}
                            </div>
                        </Link>
                    </li>
                ))}</ul>
            )}
            <div className='books__nav'>
                {(offset !== 0)
                ? <Button className='button' children='< Fyrri síða' onClick={this.clickHandlerPrev()}/>
                : null}
                <p className='books__nav__page'>Síða {page}</p>
                {data.result.items.length === 10 && (
                  <Button className='button' children='Næsta síða >' onClick={this.clickHandlerNext()}/>
                )}
            </div>
        </div>
        );
    }
};
