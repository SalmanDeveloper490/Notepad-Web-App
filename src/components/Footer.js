import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-2 bg-light copyright">
              <p className="text-center mb-0 text-uppercase text-secondary">
                Notepad Web App Made With React
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
