import React from 'react';
import { CSVLink } from 'react-csv';

import Note from './Note';

import './NoteList.css';


export default class NoteList extends React.Component {






  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };



  render() {
    return (
      <div className="YourNotes">
        <h2 className="SectionTitle">Your Notes:</h2>
          <CSVLink className="YourNotes-CSV" data={this.state.notes} filename={"lambda-notes.csv"}>Download CSV</CSVLink>
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
