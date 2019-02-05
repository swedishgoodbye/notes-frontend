import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getNotes } from "../../actions";

import Note from "./Note";

import "./NoteList.css";

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // notes: []
    };
    this.props.getNotes();
  }

  // componentWillMount() {
  //   this.props.getNotes();

  //   // this.setState({
  //   //   // noteIndex: 0,
  //   //   notes: this.props.notes
  //   // });
  //   // console.log(this.props);
  // }

  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };

  handleNoteClick = event => {
    this.setState({
      [event.target._id]: event.target.value
    });
  };

  render() {
    return (
      <div className="YourNotes">
        <h2 className="SectionTitle">Your Notes:</h2>
        {/* <div className="notes-section"> */}
        <div className="note-container">
          {this.props.notes.map(note => {
            return (
              <Link
                className="note-outer-wrapper"
                onClick={event => this.handleNoteClick(event)}
                to={{ pathname: `/view/${note._id}`, state: { note: note } }}
              >
                <div className="note-inner-wrapper">
                  <div className="note-title">{note.title}</div>
                  <div className="note-content">{note.content}</div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(
  mapStateToProps,
  { getNotes }
)(NoteList);
