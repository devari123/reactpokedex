import React from 'react';

// Define the prop types for PokemonPagination component
interface PokemonPaginationProps {
  // Two functions to get the next set of Pokemon; can be null if not available
  getNextSetOfPokemon: null | (() => void);
  getPreviousSetOfPokemon: null | (() => void);
}

// Functional component for pagination controls
const PokemonPagination: React.FC<PokemonPaginationProps> = ({ getNextSetOfPokemon, getPreviousSetOfPokemon }) => {
  return (
    <div>
      {getNextSetOfPokemon && <button onClick={getNextSetOfPokemon}>Next</button>}
      {getPreviousSetOfPokemon && <button onClick={getPreviousSetOfPokemon}>Previous</button>}
    </div>
  )
}

export default PokemonPagination;
