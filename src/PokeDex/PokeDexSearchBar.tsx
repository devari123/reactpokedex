import React from 'react';

// Define the prop types for the PokeDexSearchBarProps component
interface PokeDexSearchBarProps {
  // A variable that represents the search phrase
  searchPhrase: string;
  // A function to set the searchWord state variable to anything entered in the textbox
  setSearchPhrase: (event: string) => void | null;
  // A function that searches for a singular pokemon based on the user's input
  findThisPokemon: null | (() => void);
}

const PokeDexSearchBar: React.FC<PokeDexSearchBarProps> = ({ searchPhrase, setSearchPhrase, findThisPokemon }) => {

  return (
    <>
      {setSearchPhrase && <input type="search" placeholder="Search..." onChange={(event) => setSearchPhrase(event.target.value)} value={searchPhrase} />}
      {(findThisPokemon && searchPhrase) &&
        <button onClick={findThisPokemon}>
          Search
        </button>
      }
    </>
  )
}

export default PokeDexSearchBar;