import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return(
        <Fragment>
            <div className="container py-5 text-center">
                 <h1>Ooop's No Page Found</h1>
                 <Link to="/" className="btn btn-primary">Go Back</Link>
            </div>
        </Fragment>
    )
}

export default Error;