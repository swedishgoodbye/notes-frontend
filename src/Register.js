import React from 'react'
import { Link } from 'react-router-dom';

export default class RegUser extends React.Component {
    state = {
      username: '',
      password: '',
    };
  
    handleInputChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    handleSubmit = _ => {
      const { username, password } = this.state;
      this.props.createNote({ username, password });
      this.setState({ username: '', password: '', });
      console.log('reg')

    };

    render() {
        const { username, password } = this.state;
        return (
            <div className='RegUser'>
                <h3 className='RegTitle'>Enter A Username and Password To Register:</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                    className='RegUser-Username'
                    value={username}
                    name='username'
                    type='text'
                    placeholder='Enter A Username'
                    onChange={this.handleInputChange}
                    required
                    />
                    <br />
                    <input
                    className='RegUser-Password'
                    value={password}
                    name='password'
                    type='text'
                    placeholder='Enter A Password'
                    onChange={this.handleInputChange}
                    required
                    />
                    <br />
                    <Link to='/'><button onClick={() => this.handleSubmit()} type='submit'>Register</button></Link>
                </form>
            </div>
        )
    }

}