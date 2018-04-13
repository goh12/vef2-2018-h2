import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';

import './book-new.css';

export default class BookNew extends Component {

    
    render() {        
        
        return (
        <div className='booksidedit'>
            <h2 className='booksidedit__title'>Breyta bók</h2>
            <form onSubmit={this.handleSubmit}>
                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='title'>Title:</label>
                    <input className='booksidedit__input' id='title' type='text' name='title' onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='author'>Höfundur:</label>
                    <input className='booksidedit__input' id='author' type='text' name='author'  onChange={this.handleInputChange} />
                </div>

                <div>
                    <label className='booksidedit__label' htmlFor='description'>Lýsing:</label>
                    <textarea className='booksidedit__textarea' rows='7' cols='80' id='description' name='description' onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='category'>Flokkur:</label>
                    {typeof(categories) === "object" ? (
                    <select name='category'  onChange={this.handleInputChange} className='booksidedit__input'>
                    {/*categories.result.items.map((category, i) => (
                        <option key={i}>
                            {category.title}
                        </option>
                    ))*/}
                    </select>
                    ) : ('')}
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='isbn10'>ISBN10:</label>
                    <input className='booksidedit__input' id='isbn10' type='text' name='isbn10'  onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='isbn13'>ISBN13:</label>
                    <input className='booksidedit__input' id='isbn13' type='text' name='isbn13'  onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='published'>Útgefin:</label>
                    <input className='booksidedit__input' id='published' type='text' name='published'  onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='pagecount'>Fjöldi síða:</label>
                    <input className='booksidedit__input' id='pagecount' type='text' name='pagecount'  onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='language'>Tungumál:</label>
                    <input className='booksidedit__input' id='language' type='text' name='language'  onChange={this.handleInputChange} />
                </div>

                <button className='button'>Vista</button>
            </form>
            <div className='booksidedit__nav'>
                <Link className='button' to='/books'>Til baka</Link>
            </div>
        </div>
        );
    } 
};

