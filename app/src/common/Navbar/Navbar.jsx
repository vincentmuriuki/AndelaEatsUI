import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => (
  <header>
    <Link to="/">
      Andela Eats
    </Link>
    <br />
    <Link to="/login">
      Log in
    </Link>
  </header>
);

export default Navbar;

