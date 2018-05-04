import React from 'react';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

import Note from './Note';

import './NoteList.css';


export default class NoteList extends React.Component {


  componentDidMount(){
    console.log(this.props)
  }



  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };

  handleNoteClick = (event) => {
    this.setState({
      [event.target._id]: event.target.value,
    })
  }


  render() {
    return (
      <div className="YourNotes">
        <h2 className="SectionTitle">Your Notes:</h2>
        <div className='note-container'>
        {this.props.notes.map(note => {
         return ( 
         <Link className='note-card' onClick={(event) => this.handleNoteClick(event)} to={`/view/${event.target_id}`}>
          <div>
            <div>{note.title}</div>
            <div>{note.content}</div>
          </div>
          </Link>
        )})}
        </div>
      </div>
    );
  };
}
