import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

class Home extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      token: localStorage.getItem('token'),
    };
  }
  render() {
    const isLoggedIn = !!this.state.token;
    if (isLoggedIn) {
      return <Redirect to="/feed" />
    }
    return (
      <div className="App">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            value={ this.state.email }
            onChange={ this.handleEmailChange }
            name="email"
          />
          <input
            type="password"
            value={ this.state.password }
            onChange={ this.handlePasswordChange }
          />
          <button>Login</button>
        </form>
        <div>
          <button onClick={ this.getFeed }>Get Feed</button>
        </div>
      </div>
    );
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.currentTarget.value,
    });
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.currentTarget.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    const config = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };
    const promise = fetch('https://propulsion-blitz.herokuapp.com/api/login', config);
    promise.then((response) => {
      console.log('in da then');
      return response.json().then((user) => {
        console.log('in da second then');
        this.setState({
          token: user.token,
          email: '',
          password: '',
        });
        localStorage.setItem('token', user.token);
        // this.props.history.push('/feed');
      })
    })
  }

  getFeed = () => {
    const headers = new Headers({
      Authorization: `Bearer ${this.state.token}`,
    });
    const config = {
      headers: headers,
    };
    fetch('https://propulsion-blitz.herokuapp.com/api/feed', config)
      .then((response) => {
        console.log('in da response');
        console.log(response);
        return response.json()
      })
      .then((feed) => {
        console.log('in da second feed then');
        console.log(feed);
      })
  }
}

export default Home;
