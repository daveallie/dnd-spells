import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

const NavBarLink = ({ url, text }) => (
  <Link to={ url }>
    { text }
  </Link>
);

NavBarLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default NavBarLink;
