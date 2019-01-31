import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { editNote, addNote, getNotes } from "../../actions";

import "../create/CreateNote.css";

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.note.title,
      content: this.props.location.state.note.content
    });
    // console.log("edit state", this.state);
    // console.log("mounting this", this);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { title, content } = this.state;
    // console.log(title, "Submit data");
    this.props.editNote({ title, content }, this.props.location.state.note._id);
    // this.setState({ title: "", content: "" });
  };

  render() {
    const { title, content } = this.state;
    const id = this.props.location.state.note._id;
    return (
      <div className="CreateNote">
        <h2 className="SectionTitle">Edit Note:</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            className="CreateNote-TitleBox"
            value={title}
            name="title"
            type="text"
            onChange={this.handleInputChange}
            maxLength="32"
            required
          />
          <br />
          <textarea
            className="CreateNote-contentBox"
            value={content}
            name="content"
            type="text"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link
            to={{
              pathname: `/`
            }}
          >
            <button onClick={this.handleSubmit} type="submit">
              Update
            </button>
          </Link>
        </form>
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
  { addNote, getNotes, editNote }
)(EditNote);
