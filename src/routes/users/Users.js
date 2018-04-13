import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';
import Button from '../../components/button';

import './Users.css';

export default class Users extends Component {

    state = {
        data: null,
        loading: true,
        offset: 0,
        page: 1
      }
      
    async componentDidMount() {
        this.fetchUsers('0');
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset) {
            this.fetchUsers(this.state.offset);
        }
    }
      
    fetchUsers = async (offset) => {
        try {
            const data = await api.get(`users?offset=${offset}`);
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

          this.setState({ offset: offset+10, page: page+1 })
        }
    }

    clickHandlerPrev = () => {
        return (e) => {
          e.preventDefault();

          const { offset, page } = this.state;

          this.setState({ offset: offset-10, page: page-1 })
        }
    }
    
    render() {
        const { data, loading, error, offset, page } = this.state;

        if (loading) {
            return(<p>Sæki notendur...</p>);
        }

        if (error) {
            return(<p>Villa við að sækja notendur</p>);
        }
        
        return (
        <div className='users'>
            <h2>Notendur</h2>
            {data.result.items && (
                <ul className='users__container'>{data.result.items.map((user,i) => (
                  
                    <li className='users__item' key={i}>
                        <Link to={`/users/${user.id}`}>
                        <div className='users__item__title'>
                        {user.name}
                        </div>
                        </Link>
                    </li>
                  
                ))}</ul>
            )}
            <div className='users__nav'>
                {(offset !== 0)
                ? <Button className='button' children='< Fyrri síða' onClick={this.clickHandlerPrev()}/>
                : null}
                <p className='users__nav__page'>Síða {page}</p>
                <Button className='button' children='Næsta síða >' onClick={this.clickHandlerNext()}/>
            </div>
        </div>
        );
    } 
};

