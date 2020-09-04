import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>404 page not found.</h3>
      <Link to='/'>Back home</Link>
    </div>
  );
};

export default NotFound;
