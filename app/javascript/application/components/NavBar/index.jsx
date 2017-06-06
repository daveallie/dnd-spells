import React from 'react';
import ImmutablePropTypes from "react-immutable-proptypes"
import NavBarItem from '../NavBarItem';

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
