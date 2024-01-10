import React, { KeyboardEvent } from 'react';

// Define the prop types for the PokeDexSearchBarProps component
interface PokeDexSearchBarProps {
  // A variable that represents the search phrase
  searchPhrase: string;
  // A function to set the searchWord state variable to anything entered in the textbox
  setSearchPhrase: (event: string) => void | null;
  // A function that searches for a singular pokemon based on the user's input
  findThisPokemon: null | ((somePhrase: string) => void);
}

const PokeDexSearchBar: React.FC<PokeDexSearchBarProps> = ({ searchPhrase, setSearchPhrase, findThisPokemon }) => {
  // This function carries out the findThisPokemon function if the user presses Enter
  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && findThisPokemon && searchPhrase) {
      findThisPokemon(searchPhrase);
    }
  }

  return (
    <>
      {setSearchPhrase && 
      <input
        type="search"
        placeholder="Search..."
        onChange={(event) => setSearchPhrase(event.target.value)}
        value={searchPhrase}
        onKeyDown={(event) => handleOnKeyDown(event)}
      />}
      {(findThisPokemon && searchPhrase) &&
        <button
          onClick={() => findThisPokemon(searchPhrase)}
        >
          Search
        </button>
      }
    </>
  )
}

export default PokeDexSearchBar;