import React from 'react';
import ImmutablePropTypes from "react-immutable-proptypes"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const NavBarItem = ({ item }) => (
<li>
      <NavBarLink url={item.get("url")} text={item.get("text")} />
      {item.get("submenu") && <NavBar items={item.get("submenu")}/>}
    </li>
);

NavBarItem.propTypes = {
    item: ImmutablePropTypes.mapContains({
        text: PropTypes.string.isRequired,
        url: PropTypes.string,
        submenu: ImmutablePropTypes.list
    }).isRequired
};

const NavBarLink = ({ url, text }) => (
    <Link to={ url }>
        { text }
    </Link>
);

NavBarLink.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
};

const NavBar = props => (
  <ul>
    {props.items.map((item) =>
      <NavBarItem key={item.get("uuid")} item={item} />
    )}
  </ul>
);

NavBar.propTypes = {
  items: ImmutablePropTypes.list.isRequired,
};

export default NavBar;
