import React, { CSSProperties } from 'react';

// Define the prop types for PokemonPagination component
interface PokemonPaginationProps {
  // Two functions to get the next set of Pokemon; can be null if not available
  getNextSetOfPokemon: null | (() => void);
  getPreviousSetOfPokemon: null | (() => void);
}

// Functional component for pagination controls
const PokeDexPagination: React.FC<PokemonPaginationProps> = ({ getNextSetOfPokemon, getPreviousSetOfPokemon }) => {
  // Styling definitions
  const paginationRoot: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '17%',
    margin: '1% 0% 1%',
    paddingRight: '2%',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '2.5%'
  };
  return (
    <div style={paginationRoot}>
      {getPreviousSetOfPokemon && <button onClick={getPreviousSetOfPokemon}>Previous</button>}
      {getNextSetOfPokemon && <button onClick={getNextSetOfPokemon}>Next</button>}
    </div>
  )
}

export default PokeDexPagination;
