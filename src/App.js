import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import NoteList from './NoteList';
import CreateNote from './CreateNote';
import NoteView from './NoteView';
import EditNote from './EditNote';
import Login from './LogIn';
import Register from './Register';

import './App.css';


export default class App extends React.Component {
  nextId = 0; 
  noteIndex = 0;
  nextUserId = 0;

  state = {
    notes: [],
    users:[]
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
    .post('https://aqueous-hollows-18494.herokuapp.com/new', newNote)
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
    axios.get('https://aqueous-hollows-18494.herokuapp.com/')
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
    .put('https://aqueous-hollows-18494.herokuapp.com/edit/:id', editedNote)
    .then(res => {
      this.setState({
        notes: editedNotes
      })
    })

    axios.get('https://aqueous-hollows-18494.herokuapp.com/')
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

    axios.delete('https://aqueous-hollows-18494.herokuapp.com/:id')
    .then(
      console.log(`${id} deleted`)
    )
    axios.get('https://aqueous-hollows-18494.herokuapp.com/')
    .then(response => {
      this.setState({ notes: response.data })
    })
  };


    // const lessNotes = this.state.notes.filter(note => note.id !== inputId);


    // this.setState({
    //   notes: lessNotes,
    // });

    handleRegister = inputUser => {
      const newUser = {
        userId: this.nextUserId++,
        username: inputUser.username,
        password: inputUser.password,
      };
      const newUsers = [...this.state.users, newUser];
      console.log('handlecreatenote')
  
      axios
      // .post('https://peaceful-meadow-91763.herokuapp.com/new', newNote)
      .post('https://aqueous-hollows-18494.herokuapp.com/register', newUser)
      .then(response => {
        console.log(response);
        this.setState({
          users: newUsers
        });
      })
      .catch(err => {
        console.log({err: 'handleCreateNote error in App component'})
      })
  
      // axios.get('https://peaceful-meadow-91763.herokuapp.com/')
      axios.get('https://aqueous-hollows-18494.herokuapp.com/')
      .then(response => {
        this.setState({ notes: response.data })
      })
  
  
      
      // const newNotes = [...this.state.notes, newNote];
      // this.setState({
      //   notes: newNotes,
      // });
    };

    handleLogin = inputUser => {
      const User = {
        username: inputUser.username,
        password: inputUser.password,
      };
  
      axios
      // .post('https://peaceful-meadow-91763.herokuapp.com/new', newNote)
      .post('https://aqueous-hollows-18494.herokuapp.com/login', User)
      .then(response => {
        console.log(response, 'Logged In');
      })
      .catch(err => {
        console.log({err: 'Could Not Login'})
      })
  
      // axios.get('https://peaceful-meadow-91763.herokuapp.com/')
      axios.get('https://aqueous-hollows-18494.herokuapp.com/')
      .then(response => {
        this.setState({ users: response.data })
      })
  
  
      
      // const newNotes = [...this.state.notes, newNote];
      // this.setState({
      //   notes: newNotes,
      // });
    };


  componentDidMount(){
    axios
    .get('https://aqueous-hollows-18494.herokuapp.com/')
    .then(response =>{
      this.setState({notes: response.data})
      console.log(this.state.notes);
      console.log(this.state.notes._id);
    })

  }


  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Route exact path={"/"} render={() => <NoteList notes={this.state.notes} handleNoteViewIndex={this.handleNoteViewIndex} />} />
          <Route exact path={"/new"} render={() => <CreateNote createNote={this.handleCreateNote} />} />
          <Route exact path={`/view/${this.state.notes.id}`} render={() => <NoteView note={this.state.notes[this.noteIndex]} toggleModal={this.toggleModal} handleDeleteNote={this.handleDeleteNote} />} />
          <Route exact path={"/edit"} render={() => <EditNote note={this.state.notes[this.noteIndex]} handleEditNote={this.handleEditNote} />} />
          <Route exact path={"/login"} render={() => <Login user={this.state.users} handleLogin={this.handleLogin} />} />
          <Route exact path={"/register"} render={() => <Register user={this.state.users} handleRegister={this.handleRegister} />} />
        </div>
      </Router>
    );
  };
}
