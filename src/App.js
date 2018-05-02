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
      if (this.state.notes[i]._id === inputId) this.noteIndex = i;
    };
  };

  handleCreateNote = inputNote => {
    const newNote = {
      _id: this.nextId++,
      title: inputNote.title,
      body: inputNote.body,
    };
    const newNotes = [...this.state.notes, newNote];

    axios
    .post('https://swedishgood-note.herokuapp.com/notes/new', newNote)
    .then(response => {
      console.log(response);
      this.setState({
        notes: newNotes
      });
    })

    axios.get('https://swedishgood-note.herokuapp.com/notes')
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
      _id: inputNote.id,
      title: inputNote.title,
      body: inputNote.body,
    };
    const editedNotes = [...this.state.notes];

    axios
    .put('https://swedishgood-note.herokuapp.com/notes/edit/:id', editedNote)
    .then(res => {
      this.setState({
        notes: editedNotes
      })
    })

    axios.get('https://swedishgood-note.herokuapp.com/notes')
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

    axios.delete('https://swedishgood-note.herokuapp.com/notes/:id')
    .then(
      console.log(`${id} deleted`)
    )
    axios.get('https://swedishgood-note.herokuapp.com/notes')
    .then(response => {
      this.setState({ notes: response.data })
    })
  };


    // const lessNotes = this.state.notes.filter(note => note.id !== inputId);


    // this.setState({
    //   notes: lessNotes,
    // });
  

  updateSortedNotes = sortedNotes => {
    this.setState({
      notes: sortedNotes,
    })
  }

  componentDidMount(){
    axios
    .get('https://swedishgood-note.herokuapp.com/notes')
    .then(response =>{
      this.setState(() => {notes: response.data})
    })

  }


  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Route exact path={"/"} render={() => <NoteList notes={this.state.notes} handleNoteViewIndex={this.handleNoteViewIndex} updateSortedNotes={this.updateSortedNotes}/>} />
          <Route exact path={"/create"} render={() => <CreateNote createNote={this.handleCreateNote} />} />
          <Route exact path={"/view"} render={() => <NoteView note={this.state.notes[this.noteIndex]} toggleModal={this.toggleModal} handleDeleteNote={this.handleDeleteNote} />} />
          <Route exact path={"/edit"} render={() => <EditNote note={this.state.notes[this.noteIndex]} handleEditNote={this.handleEditNote} />} />
        </div>
      </Router>
    );
  };
}
