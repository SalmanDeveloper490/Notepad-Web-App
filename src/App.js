import React, { Component } from "react";
import "./App.css";
import TopNavbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import Error from "./components/Error";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Appmode from "./components/Appmode";

toast.configure();
class App extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
  }

  state = {
    value: "",
    find: "",
    replace: "",
    darkTheme: false,
  };

  componentDidMount() {
    this.setState({
      darkTheme: JSON.parse(localStorage.getItem("darkTheme")),
    });
    //console.log(this.state.darkTheme);
  }

  saveFile = () => {
    const filename = prompt("Please Enter Your Filename");
    if (filename) {
      const content = this.stripTags(this.state.value);
      const file = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(file, `${filename}`);
      toast.success("File Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Please Type Your Filename", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  find = (e) => {
    this.setState({
      find: e.target.value,
    });
  };

  replace = (e) => {
    this.setState({
      replace: e.target.value,
    });
  };

  replaceTextHandler = () => {
    const valueToFind = this.state.find;
    const valueToReplace = this.state.replace;
    let value = this.stripTags(this.state.value);
    console.log(valueToReplace, value, valueToFind);
    // match value and replace text
    if (valueToReplace === "") {
      return null;
    } else {
      if (value.match(valueToReplace)) {
        if (value.length > 0) {
          value = value.replaceAll(valueToFind, valueToReplace);
          toast.success("Text Replaced Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          document.getElementsByClassName("show")[0].style.opacity = "0";
          document.getElementsByClassName("hide-modal")[0].style.display =
            "none";
        } else {
          toast.error("Oops ! Something Went Wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        alert(`Cannot Replace ${valueToReplace}`);
      }
    }
    this.setState({
      value: value,
    });
  };

  stripTags = (html) => {
    return html.replaceAll(/(<([^>]+)>)/gi, "");
  };

  findTextHandler = () => {
    const valueToFind = this.state.find;
    let value = this.stripTags(this.state.value);
    //console.log(valueToFind, value);
    if (valueToFind === "") {
      return null;
    } else {
      if (value.match(valueToFind)) {
        if (value.length > 0) {
          value = value.replaceAll(
            valueToFind,
            `<span class="highlight">${valueToFind}</span>`
          );
        }
      } else {
        alert(`Cannot match ${valueToFind}`);
      }
    }

    this.setState({
      value: value,
    });
  };

  handleChange = (evt) => {
    this.setState({ value: evt.target.value });
  };

  themeMode = () => {
    //console.log("=>" + this.state.darkTheme);
    this.setState({
      darkTheme: !this.state.darkTheme,
    });
    localStorage.setItem("darkTheme", JSON.stringify(!this.state.darkTheme));
    //console.log(this.state.darkTheme);
    return this.state.darkTheme || false;
  };

  render() {
    return (
      <div className={this.state.darkTheme ? "dark-theme" : "light-theme"}>
        <Router>
          <TopNavbar
            saveFile={this.saveFile}
            find={this.find}
            replaceTextHandler={this.replaceTextHandler}
            replace={this.replace}
            findTextHandler={this.findTextHandler}
            buttonHandler={this.buttonHandler}
          />
          <Appmode themeMode={this.themeMode} theme={this.state.darkTheme} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <div className="container py-5">
                  <ContentEditable
                    className="notepad"
                    innerRef={this.contentEditable}
                    html={this.state.value} // innerHTML of the editable div
                    disabled={false} // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                  />
                </div>
              )}
            />
            <Route component={Error} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
