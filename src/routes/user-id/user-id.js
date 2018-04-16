import React, { Component } from 'react';
import api from '../../api';

import './user-id.css';
import ReadBooks from '../../components/read-books';

export default class Userid extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    const data = await api.get(
      `users/${this.props.match.params.id}`
    );

    if(data.status !== 200) {
      return this.setState({
        error: data.error
      });
    }

    console.log(data);
    this.setState({
      user: data.result,
      isLoading: false,
    })
  }
    
    render() {
      if (this.state.isLoading) {
        return (<p>Næ í gögn</p>);
      }

      if (this.state.error) {
        return (<p>{this.state.error}</p>);
      }

      const { user } = this.state;
      console.log(user);
      return (
        <div className='user-id'>
        <div>
          <img alt='profile' className="user-id__image" src={user.image || '/profile.jpg'} />
          <p className='user-id__name'>{user.name}</p>
        </div>
          <h2 className='user-id__heading'>Lesnar Bækur</h2>
          <ReadBooks id={user.id} />
        </div>
      );
    } 
};

