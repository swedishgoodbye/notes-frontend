import React from "react";
import ReactMarkdown from "react-markdown";
import DeleteNote from "./DeleteNote";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deleteNote } from "../../actions";

import "./NoteView.css";

class NoteView extends React.Component {
  boolModal = false;

  state = {
    title: this.props.location.state.note.title,
    content: this.props.location.state.note.content,
    _id: this.props.location.state.note._id
  };

  // toggleModal = _ => {
  //   this.boolModal = !this.boolModal;
  //   this.forceUpdate();
  // };

  handleDeleteNote = event => {
    this.props.deleteNote(this.state._id);
  };

  componentDidMount() {
    this.setState({
      title: this.props.location.state.note.title,
      content: this.props.location.state.note.content,
      _id: this.props.location.state.note._id
    });
    console.log("view mount", this.state);
    console.log(this.props);
  }

  render() {
    const { _id, title, content } = this.state;
    const notes = this.state;
    return (
      <div className="NoteView">
        {/*TODO: Fix Modal / Alert For Deletion */}
        {/* {this.boolModal ? ( */}
        {/* <div>
            <DeleteNote
              id={_id}
              toggleModal={this.toggleModal}
              handleDeleteNote={this.handleDeleteNote}
            /> */}
        {/* </div> */}
        {/* ) : null} */}
        <div className="NoteView-Links">
          <div>
            <Link
              className="NoteView-Links-Link"
              id={_id}
              to={{ pathname: `/edit/${_id}`, state: { note: notes } }}
            >
              edit
            </Link>
          </div>
          <div>
            <Link
              className="NoteView-Links-Link"
              // onClick={() => this.toggleModal()}
              onClick={this.handleDeleteNote}
              to={"/"}
            >
              delete
            </Link>
          </div>
        </div>
        <div>
          <h2 className="SectionTitle">{title}</h2>
          <ReactMarkdown source={content} />
        </div>
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
  { deleteNote }
)(NoteView);
