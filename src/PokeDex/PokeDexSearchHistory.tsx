import React, { CSSProperties, useMemo } from 'react';


// interface definition of the type of prop expected
interface PokeDexSearchHistoryProps {
  searchHistory: string[] | null;
  // A function that searches for a singular pokemon based on the user's input
  findThisPokemon: null | ((somePhrase: string, addToSearchHistory: boolean) => void);
}

const PokeDexSearchHistory: React.FC<PokeDexSearchHistoryProps> = ({ searchHistory, findThisPokemon }) => {
  // Styling for the root container
  const previousSearchWordsRoot: CSSProperties = {
    display: 'flex',
    maxWidth: '44%',
    position: 'fixed',
    top: '11%',
    right: '2%',
    overflow: 'auto',
    zIndex: 30,
  };

  const yourRecentSearchesText: CSSProperties = {
      color: 'white',
      position: 'fixed',
      fontWeight: 500,
      top: '8%',
      right: '2%',
      zIndex: 30,
    };
  
  /* 
    Function to display the search history as chips. The larger the 'searchHistory' array stored in localStorage gets, the more intensive this function becomes.
    So in the event that there were 10000+ searches made, rendering a JSX element for each search would be a function best suited inside useMemo
  */
  const displayCurrentSearchHistory = useMemo(() => {
    // Styling for each search history chip
    const previousSearchWordChip: CSSProperties = {
      width: 'auto',
      marginRight: '5px',
      padding: '5px',
      backgroundColor: '#f0f0f0',
    };

    // Return null if searchHistory is null or empty
    if (!searchHistory || searchHistory.length === 0) {
      return null;
    }

    // Map through searchHistory and create an array of JSX elements that display every past search in a formatted way
    return searchHistory.map((previousSearchWord, index) => (
      <button style={previousSearchWordChip} key={index} onClick={() => {
        if (findThisPokemon) {
          // since the function exists, we will call it using a previous search word clicked by a user, and we will pass false so the search word isnt duplicated in the searchHistory array
          findThisPokemon(previousSearchWord, false);
        }
      }}>
        {previousSearchWord}
      </button>
    ));
  }, [searchHistory, findThisPokemon]);

  // Render the search history component
  return (
    <>
      <p style={yourRecentSearchesText}>
        Your Recent Searches
      </p>
      <div style={previousSearchWordsRoot}>
        {searchHistory && searchHistory.length > 0 && displayCurrentSearchHistory}
      </div>
    </>
  );
}

export default PokeDexSearchHistory;