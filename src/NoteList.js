import React from 'react';
import { CSVLink } from 'react-csv';

import Note from './Note';

import './NoteList.css';


export default class NoteList extends React.Component {


  componentDidMount(){
    console.log(this.props)
  }



  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };



  render() {
    return (
      <div className="YourNotes">
        <h2 className="SectionTitle">Your Notes:</h2>
        {this.props.notes.map(note => {
          <div>
          <div>{note.title}</div>
          <div>{note.content}</div>
          </div>
        })}
      </div>
    );
  };
}
