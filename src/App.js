import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import NoteList from './NoteList';
import CreateNote from './CreateNote';
import NoteView from './NoteView';
import EditNote from './EditNote';

import './App.css';


export default class App extends React.Component {
  nextId = 0;
  noteIndex = 0;

  state = {
    notes: [],
  };

  handleNoteViewIndex = inputId => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id === inputId) this.noteIndex = i;
    };
  };

  handleCreateNote = inputNote => {
    const newNote = {
      id: this.nextId++,
      title: inputNote.title,
      content: inputNote.content,
    };
    const newNotes = [...this.state.notes, newNote];
    console.log('handlecreatenote')

    axios
    // .post('https://peaceful-meadow-91763.herokuapp.com/new', newNote)
    .post('http://localhost:5000/new', newNote)
    .then(response => {
      console.log(response);
      this.setState({
        notes: newNotes
      });
    })
    .catch(err => {
      console.log({err: 'handleCreateNote error in App component'})
    })

    // axios.get('https://peaceful-meadow-91763.herokuapp.com/')
    axios.get('http://localhost:5000/')
    .then(response => {
      this.setState({ notes: response.data })
    })


    
    // const newNotes = [...this.state.notes, newNote];
    // this.setState({
    //   notes: newNotes,
    // });
  };

  handleEditNote = inputNote => {
    const editedNote = {
      id: inputNote.id,
      title: inputNote.title,
      body: inputNote.body,
    };
    const editedNotes = [...this.state.notes];

    axios
    .put('https://peaceful-meadow-91763.herokuapp.com/edit/:id', editedNote)
    .then(res => {
      this.setState({
        notes: editedNotes
      })
    })

    axios.get('https://peaceful-meadow-91763.herokuapp.com/')
    .then(response => {
      this.setState({ notes: response.data })
    })
    // editedNotes.splice(this.noteIndex, 1, editedNote);
    // this.setState({
    //   notes: editedNotes,
    // });
  };

  handleDeleteNote = inputId => {
    const id = inputId;

    axios.delete('https://peaceful-meadow-91763.herokuapp.com/:id')
    .then(
      console.log(`${id} deleted`)
    )
    axios.get('https://peaceful-meadow-91763.herokuapp.com/')
    .then(response => {
      this.setState({ notes: response.data })
    })
  };


    // const lessNotes = this.state.notes.filter(note => note.id !== inputId);


    // this.setState({
    //   notes: lessNotes,
    // });
  


  componentDidMount(){
    axios
    .get('http://localhost:5000/')
    .then(response =>{
      this.setState({notes: response.data})
    })

  }


  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Route exact path={"/"} render={() => <NoteList notes={this.state.notes} handleNoteViewIndex={this.handleNoteViewIndex} />} />
          <Route exact path={"/new"} render={() => <CreateNote createNote={this.handleCreateNote} />} />
          <Route exact path={"/view"} render={() => <NoteView note={this.state.notes[this.noteIndex]} toggleModal={this.toggleModal} handleDeleteNote={this.handleDeleteNote} />} />
          <Route exact path={"/edit"} render={() => <EditNote note={this.state.notes[this.noteIndex]} handleEditNote={this.handleEditNote} />} />
        </div>
      </Router>
    );
  };
}
