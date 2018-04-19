import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

import './BooksIdEdit.css';

export default class BooksIdEdit extends Component {
    
    state = {
        data: null,
        loading: true,
        categories: null,
        patched: false
      }
      
    async componentDidMount() {
        const { id } = this.props.match.params;
        await this.fetchData(id);
    }
      
    fetchData = async (id) => {
        try {
            const data = await api.get(`books/${id}`);
            const { result } = data;
            const categories = await api.get('categories?limit=1000');
            this.setState({ 
                title: result.title, 
                author: result.author, 
                description: result.description, 
                category: result.category, 
                categorytitle: result.categorytitle, 
                isbn10: result.isbn10, 
                isbn13: result.isbn13,
                published: result.published, 
                pagecount: result.pagecount, 
                language: result.language, 
                categories, 
                loading: false });
            if (data.result.error) {
                this.setState({ error: true });
            }

        } catch (error) {
            console.error(error);
            this.setState({ error: true, loading: false });            
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

        const { title, 
            author, 
            description, 
            category, 
            isbn10, 
            published, 
            pagecount, 
            language, 
            isbn13 } = this.state;        
        
        const options = {
            title,
            author,
            description,
            category,
            isbn10,
            published,
            pageCount: pagecount,
            language,
            isbn13
        };

        const { id } = this.props.match.params;
        const response = await api.patch(`books/${id}`, options);

        if (response.result.errors) {
            this.setState({ patchErrors: response.result.errors });
        } else {
            this.setState({ patched: true});
        }
    }
    
    render() {        
        const { title, 
            author, 
            description, 
            category, 
            isbn10, 
            published, 
            pagecount, 
            language, 
            isbn13, 
            loading, 
            error, 
            categories,
            patched,
            patchErrors } = this.state;
        const { id } = this.props.match.params;    
        
        // field validation errors
        const titleFieldError = patchErrors ? patchErrors.some(item => item.field === 'title') : false;
        const isbn10FieldError = patchErrors ? patchErrors.some(item => item.field === 'isbn10') : false; 
        const isbn13FieldError = patchErrors ? patchErrors.some(item => item.field === 'isbn13') : false;       
        
        if (loading) {
            return(<p>Sæki bók ...</p>);
        }

        if (error) {
            return(<p>Villa við að sækja bók</p>);
        }
        
        if (patched) {
            return(
                <div>
                    <p>Bók breytt!</p>
                    <Link to={`/books/${id}`}>Skoða bók</Link>
                </div>
            );
        }
        
        return (
        <div className='booksidedit'>
            <h2 className='booksidedit__title'>Breyta bók</h2>
            {patchErrors ? (
                <ul>{patchErrors.map((patcherror, i) => (
                    <li key={patcherror.field}>
                        {patcherror.message}
                    </li>
                ))}</ul>
            ) : ('')}
            <form onSubmit={this.handleSubmit}>
                <div className='booksidedit__container'>
                    <label className={titleFieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='title'>Title:</label>
                    <input className={titleFieldError ? 'booksidedit__input--error':'booksidedit__input'} 
                        id='title' type='text' name='title' value={title} onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='author'>Höfundur:</label>
                    <input className='booksidedit__input' id='author' type='text' name='author' value={author} onChange={this.handleInputChange} />
                </div>

                <div>
                    <label className='booksidedit__label' htmlFor='description'>Lýsing:</label>
                    <textarea className='booksidedit__textarea' rows='7' cols='80' id='description' name='description' value={description} onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='category'>Flokkur:</label>
                    {typeof(categories) === "object" ? (
                    <select name='category' value={category} onChange={this.handleInputChange} className='booksidedit__input'>
                    {categories.result.items.map((category, i) => (
                        <option value={category.id} key={i}>
                            {category.title}
                        </option>
                    ))}
                    </select>
                    ) : ('')}
                </div>

                <div className='booksidedit__container'>
                    <label className={isbn10FieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='isbn10'>ISBN10:</label>
                    <input className={isbn10FieldError ? 'booksidedit__input--error':'booksidedit__input'}  
                        id='isbn10' type='text' name='isbn10' value={isbn10} onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className={isbn13FieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='isbn13'>ISBN13:</label>
                    <input className={isbn13FieldError ? 'booksidedit__input--error':'booksidedit__input'} 
                        id='isbn13' type='text' name='isbn13' value={isbn13} onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='published'>Útgefin:</label>
                    <input className='booksidedit__input' id='published' type='text' name='published' value={published} onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='pagecount'>Fjöldi síða:</label>
                    <input className='booksidedit__input' id='pagecount' type='text' name='pagecount' value={pagecount} onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className='booksidedit__label' htmlFor='language'>Tungumál:</label>
                    <input className='booksidedit__input' id='language' type='text' name='language' value={language} onChange={this.handleInputChange} />
                </div>

                <button className='button' disabled={loading}>Vista</button>
            </form>
            <div className='booksidedit__nav'>
                <Link className='button' to='/books'>Til baka</Link>
            </div>
        </div>
        );
    } 
};

