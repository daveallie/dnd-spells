import React from 'react';
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes"

import Spell from '../Spell';

const SpellList = ({ spells }) => (
  <div>
    {spells.valueSeq().map((spell) =>
      <Spell key={spell.get("id")} spell={spell} />
    )}
  </div>
)

SpellList.propTypes = {
  spells: ImmutablePropTypes.orderedMap.isRequired,
};

export default SpellList
