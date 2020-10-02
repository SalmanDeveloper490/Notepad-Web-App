import React, { Component } from "react";
import "./ckeditor.css";

class Ckeditor extends Component {
  state = {
    editorValue: this.props.html,
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps);
    // console.log(nextState);
    // // return nextProps.html !== nextState.html;
    return true;
  }

  changed = () => {
    console.log("jasdkajsd");
  };

  render() {
    return (
      <div className="container py-5">
        {/* <textarea rows="30" className="form-control inputData" name="content" onChange={props.valueChanged}></textarea> */}
        <div
          contentEditable="true"
          className="notepad"
          onInput={(e) => this.props.valueChanged(e.currentTarget.innerHTML)}
          onChange={this.changed}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
        ></div>
      </div>
    );
  }
}

export default Ckeditor;
