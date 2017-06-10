import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from "react-immutable-proptypes"
import { Map } from "immutable";

const Spell = ({ spell }) => (
  <div>
    <strong>{spell.get("name")}</strong>
    {spell.get("level")}
  </div>
);

Spell.propTypes = {
  spell: ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number
  }),
};

export default Spell;
