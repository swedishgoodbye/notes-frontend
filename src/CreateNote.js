import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import "./CreateNote.css";

export default class CreateNote extends React.Component {
  state = {
    title: '',
    content: '',
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = _ => {
    const { title, content } = this.state;
    this.props.createNote({ title, content });
    this.setState({ title: '', content: '', });
    console.log('submit')
    // axios
    // .post('https://peaceful-meadow-91763.herokuapp.com/new')
    // .then(response => {
    //   console.log(response);
    //   // this.props.createNote({ title, content });
    //   this.setState({ title: '', content: '', });
    // })
    // .catch(err => {
    //   console.log({err: 'handleSubmit error in CreateNote component'})
    // })

    // axios.get('https://peaceful-meadow-91763.herokuapp.com/')
    // .then(response => {
    //   this.setState({ notes: response.data })
    // })
  };

  render() {
    const { title, content } = this.state;
    return (
      <div className="CreateNote">
        <h2 className="SectionTitle">Create New Note:</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            className="CreateNote-TitleBox"
            value={title}
            name="title"
            type="text"
            placeholder="Note Title"
            onChange={this.handleInputChange}
            maxLength="32"
            required
          />
          <br />
          <textarea
            className="CreateNote-BodyBox"
            value={content}
            name="content"
            type="text"
            placeholder="Note Content"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link to={"/"}><button onClick={() => this.handleSubmit()} type="submit">Save</button></Link>
        </form>
      </div>
    );
  };
}
