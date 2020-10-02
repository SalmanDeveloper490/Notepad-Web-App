import React from 'react'
import ContentEditable from 'react-contenteditable'

import './notepad.css';

class Notepad extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {
      html: '',
    };
    if (this.props.findClicked) {
      this.findTextHandler();
    }
  }
  
  handleChange = evt => {
    this.setState({html: evt.target.value});
  };
 
  render = () => {
    return <div className="container py-5">
        <ContentEditable
              className="notepad"
              innerRef={this.contentEditable}
              html={this.state.html} 
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
             // Use a custom HTML tag (uses a div by default)
            />
    </div>
  }
}


export default Notepad;