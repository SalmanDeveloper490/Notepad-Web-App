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
    ischecked: false,
    Counter: 0,
  };

  componentDidMount() {
    this.setState({
      darkTheme: JSON.parse(localStorage.getItem("darkTheme")),
    });
  }

  matchCase = () => {
    //console.log(this.state.ischecked);
    this.setState({
      ischecked: !this.state.ischecked,
    });
  };

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

  replaceHandler = () => {
    const valueToFind = this.state.find;
    const valueToReplace = this.state.replace;
    let value = this.stripTags(this.state.value);
    //console.log(valueToReplace, value, valueToFind);
    // match value and replace text
    if (valueToReplace.trim() === "") {
      alert("Please Add Some Text");
      return false;
    } else {
      let regex;
      if (this.state.ischecked) {
        regex = new RegExp(valueToFind, "i");
      } else {
        regex = new RegExp(valueToFind);
      }
      if (value.match(regex)) {
        if (value.length > 0) {
          if (this.state.ischecked === true) {
            value = value.replace(regex, valueToReplace);
          } else {
            value = value.replace(regex, valueToReplace);
          }
        }
      } else {
        alert(`Cannot Replace ${valueToReplace}`);
        document.getElementsByClassName("show")[0].style.opacity = "0";
        document.getElementsByClassName("hide-modal")[0].style.display = "none";
        this.setState({
          find: "",
          replace: "",
          ischecked: false,
        });
      }
    }
    this.setState({
      value: value,
    });
  };

  replaceTextHandler = () => {
    const valueToFind = this.state.find;
    const valueToReplace = this.state.replace;
    let value = this.stripTags(this.state.value);
    //console.log(valueToReplace, value, valueToFind);
    // match value and replace text
    if (valueToReplace.trim() === "") {
      alert("Please Add Some Text");
      return false;
    } else {
      let regex;
      if (this.state.ischecked) {
        regex = new RegExp(valueToFind, "ig");
      } else {
        regex = new RegExp(valueToFind);
      }
      if (value.match(regex)) {
        if (value.length > 0) {
          if (this.state.ischecked === true) {
            value = value.replaceAll(regex, valueToReplace);
          } else {
            value = value.replaceAll(valueToFind, valueToReplace);
          }

          toast.success("Text Replaced Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            find: "",
            replace: "",
            ischecked: false,
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
    if (valueToFind.trim() === "") {
      alert("Please Add Some Text");
      return false;
    } else {
      let regex;
      if (this.state.ischecked) {
        regex = new RegExp(valueToFind, "ig");
      } else {
        regex = new RegExp(valueToFind);
      }
      if (value.match(regex)) {
        if (value.length > 0) {
          if (this.state.ischecked === true) {
            value = value.replace(regex, function (str) {
              return `<span class="highlight">${str}</span>`;
            });
          } else {
            value = value.replaceAll(
              valueToFind,
              `<span class="highlight">${valueToFind}</span>`
            );
          }
        }
      } else {
        alert(`Cannot match ${valueToFind}`);
      }
    }

    this.setState({
      value: value,
    });
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  themeMode = () => {
    this.setState({
      darkTheme: !this.state.darkTheme,
    });
    localStorage.setItem("darkTheme", JSON.stringify(!this.state.darkTheme));
    return this.state.darkTheme || false;
  };

  openFile = (e) => {
    const fileread = new FileReader();
    fileread.onload = (e) => {
      console.log(e.target);
      document.getElementsByClassName("notepad")[0].textContent =
        fileread.result;
      this.setState({
        value: fileread.result,
      });
    };
    fileread.readAsText(e.target.files[0]);
    //document.getElementsByClassName("dropdown-menu")[0].style.display = "none";
  };

  render() {
    return (
      <div className={this.state.darkTheme ? "dark-theme" : "light-theme"}>
        <Router>
          <TopNavbar
            saveFile={this.saveFile}
            find={this.find}
            replace={this.replace}
            findTextHandler={this.findTextHandler}
            replaceTextHandler={this.replaceTextHandler}
            replaceHandler={this.replaceHandler}
            findValue={this.state.find}
            replaceValue={this.state.replace}
            openFile={this.openFile}
            saveAsHandler={this.saveAsHandler}
            themeMode={this.themeMode}
            theme={this.state.darkTheme}
            matchCase={this.matchCase}
            ischecked={this.state.ischecked}
          />
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
