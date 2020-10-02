import React from "react";

const Appmode = (props) => {
  //console.log(props.theme);
  return (
    <div className="container pt-5 text-center">
      <h6>{props.theme ? "DARK THEME" : "LIGHT THEME"}</h6>

      <label className="switch">
        <input type="checkbox" onChange={props.themeMode} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Appmode;
