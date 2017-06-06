import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from "react-immutable-proptypes"

import NavBarLink from '../NavBarLink';
import NavBar from '../NavBar';

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
    submenu: ImmutablePropTypes.list,
  }).isRequired
};

export default NavBarItem;
