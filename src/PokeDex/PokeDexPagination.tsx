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
    position: 'fixed',
    justifyContent: 'space-between',
    bottom: '1.5%',
    right: '4%',
  };
  const buttonStyling: CSSProperties = {
    width: '36%',
    height: '3vh',
  }
  return (
    <div style={paginationRoot}>
      {getPreviousSetOfPokemon === null ? (
        <button disabled={getPreviousSetOfPokemon === null} style={buttonStyling}>Back</button>
      ) : (
        <button disabled={getPreviousSetOfPokemon === null} onClick={getPreviousSetOfPokemon} style={buttonStyling}>Back</button>
      )}
      {}
      {getNextSetOfPokemon === null ? (
        <button disabled={getNextSetOfPokemon === null}>Next Page</button>
      ) : (
        <button disabled={getNextSetOfPokemon === null} onClick={getNextSetOfPokemon} style={buttonStyling}>Next Page</button>
      )}
    </div>
  )
}

export default PokeDexPagination;
