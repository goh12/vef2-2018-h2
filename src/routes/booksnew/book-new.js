import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Button from '../../components/button';
import Helmet from 'react-helmet';

export default class BookNew extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        title: null, 
        author: "", 
        description: "", 
        category: '', 
        categorytitle: null, 
        isbn10: null, 
        isbn13: null,
        published: "", 
        pagecount: null, 
        language: "", 
        categories: null, 
        loading: true };
    }

    async componentDidMount() {
      const results = await api.get('categories');
      const categories = results.result.items;
      this.setState({
        ...this.state,
        categories,
        loading: false,
      });
    }

    handleInputChange = (e) => {
      const { name, value } = e.target;
              
      if (name) {
        return this.setState({ [name]: value });
      }
    }

    async saveBook(e) {
      try {
        e.preventDefault();
        const results = await api.post('books', this.state);
        if(results.result.errors) {
          return this.setState({
            ...this.state,
            postError: results.result.errors
          });
        }

        this.setState({
          postSuccess: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
    
    render() {        
        
      if(this.state.loading) {
        return (<p>Sæki gögn</p>)
      }

      if(this.state.postSuccess) {
        return (<p>Skráning hófst</p>);
      }

      const { categories, postError } = this.state;

      // field validation errors
      const titleFieldError = postError ? postError.some(item => item.field === 'title') : false;
      const isbn10FieldError = postError ? postError.some(item => item.field === 'isbn10') : false; 
      const isbn13FieldError = postError ? postError.some(item => item.field === 'isbn13') : false;       
      const categoryFieldError = postError ? postError.some(item => item.field === 'category') : false;

      return (
        <div className='booksidedit'>
          <Helmet title={`Skrá nýja bók`} />
            <h2 className='booksidedit__title'>Skrá bók</h2>
            <ul>
            {this.state.postError &&
              this.state.postError.map((err) => {
                return (<li key={err.field}>{err.message}</li>);
              }
            )}
            </ul>
            <form onSubmit={this.handleSubmit}>
                <div className='booksidedit__container'>
                    <label className={titleFieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='title'>Title:</label>
                    <input className={titleFieldError ? 'booksidedit__input--error':'booksidedit__input'} 
                      id='title' type='text' name='title' onChange={this.handleInputChange} />
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
                    <label className={categoryFieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='category'>Flokkur:</label>
                    {typeof(categories) === "object" ? (
                    <select name='category'  onChange={this.handleInputChange} 
                      className={categoryFieldError ? 'booksidedit__input--error':'booksidedit__input'}>
                    <option></option>
                    {categories.map((category, i) => (
                        <option key={i} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                    </select>
                    ) : ('')}
                </div>

                <div className='booksidedit__container'>
                    <label className={isbn10FieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='isbn10'>ISBN10:</label>
                    <input className={isbn10FieldError ? 'booksidedit__input--error':'booksidedit__input'} 
                       id='isbn10' type='text' name='isbn10'  onChange={this.handleInputChange} />
                </div>

                <div className='booksidedit__container'>
                    <label className={isbn13FieldError ? 'booksidedit__label--error':'booksidedit__label'} htmlFor='isbn13'>ISBN13:</label>
                    <input className={isbn13FieldError ? 'booksidedit__input--error':'booksidedit__input'} 
                      id='isbn13' type='text' name='isbn13'  onChange={this.handleInputChange} />
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
                
                <Button className='button' onClick={(e) => this.saveBook(e)} children='Skrá Bók' />
            </form>
            <div className='booksidedit__nav'>
                <Link className='button' to='/books'>Til baka</Link>
            </div>
        </div>
        );
    } 
};

