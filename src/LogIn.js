import React from 'react'
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
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
      console.log('log')

    };

    render() {
        const { username, password } = this.state;
        return (
            <div className='Login'>
                <h3 className='RegTitle'>Enter Your Username and Password To Login:</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                    className='Login-Username'
                    value={username}
                    name='username'
                    type='text'
                    placeholder='Enter Your Username'
                    onChange={this.handleInputChange}
                    required
                    />
                    <br />
                    <input
                    className='Login-Password'
                    value={password}
                    name='password'
                    type='text'
                    placeholder='Enter Your Password'
                    onChange={this.handleInputChange}
                    required
                    />
                    <br />
                    <Link to='/'><button onClick={() => this.handleSubmit()} type='submit'>Login</button></Link>
                </form>
            </div>
        )
    }

}