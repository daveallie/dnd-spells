import React from 'react';
import ImmutablePropTypes from "react-immutable-proptypes"
import NavBarItem from '../NavBarItem';
import styles from './styles.scss';

const NavBar = props => (
  <ul className={styles.menu}>
    {props.items.map((item) =>
      <NavBarItem key={item.get("uuid")} item={item} />
    )}
  </ul>
);

NavBar.propTypes = {
  items: ImmutablePropTypes.list.isRequired,
};

export default NavBar;
