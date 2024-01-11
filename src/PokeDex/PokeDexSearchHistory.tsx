import React, { useState, CSSProperties, useMemo } from 'react';


// interface definition of the type of prop expected
interface PokeDexSearchHistoryProps {
  searchHistory: string[] | null;
  // A function that searches for a singular pokemon based on the user's input
  findThisPokemon: null | ((somePhrase: string, addToSearchHistory: boolean) => void);
  // A function to set the searchWord state variable to anything entered in the textbox
  setSearchPhrase: (event: string) => void | null;
}

const PokeDexSearchHistory: React.FC<PokeDexSearchHistoryProps> = ({ searchHistory, findThisPokemon, setSearchPhrase }) => {
  const [showHistory, setShowHistory] = useState(false);

  // Styling for the root container
  const previousSearchWordsRoot: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    maxWidth: '44%',
    position: 'fixed',
    top: '11%',
    right: '2%',
    overflow: 'auto',
    zIndex: 30,
    minWidth: '10%',
    marginTop: '1%',
    maxHeight: '',
  } as React.CSSProperties;

  const yourRecentSearchesText: CSSProperties = {
      color: 'white',
      border: 'none',
      position: 'absolute',
      fontWeight: 500,
      top: '2.5%',
      right: '2.5%',
      zIndex: 30,
      fontSize: '1.35rem',
    };
  
  /* 
    Function to display the search history as chips. The larger the 'searchHistory' array stored in localStorage gets, the more intensive this function becomes.
    So in the event that there were 10000+ searches made, rendering a JSX element for each search would be a function best suited inside useMemo
  */
  const displayCurrentSearchHistory = useMemo(() => {
    // Styling for each search history chip
    const previousSearchWordChip: CSSProperties = {
      width: 'auto',
      padding: '5px',
    };

    // Return null if searchHistory is null or empty
    if (!searchHistory || searchHistory.length === 0) {
      return null;
    }

    // Map through searchHistory and create an array of JSX elements that display every past search in a formatted way
    return searchHistory.map((previousSearchWord, index) => (
      <button
        style={previousSearchWordChip}
        key={index}
        onClick={() => {
          if (findThisPokemon) {
            // since the function exists, we will call it using a previous search word clicked by a user, and we will pass false so the search word isnt duplicated in the searchHistory array
            setSearchPhrase(previousSearchWord);
            findThisPokemon(previousSearchWord, false);
            setShowHistory(false);
          }
        }}
      >
        {previousSearchWord}
      </button>
    ));
  }, [searchHistory, findThisPokemon, setSearchPhrase]);

  // Render the search history component
  return (
    <>
      {showHistory && <p onClick={() => setShowHistory(!showHistory)} style={yourRecentSearchesText}>
        Close Your Search History
      </p>}
      {!showHistory && <p onClick={() => setShowHistory(!showHistory)} style={yourRecentSearchesText}>
        View Your Search History
      </p>}
      <div style={previousSearchWordsRoot}>
        {searchHistory && searchHistory.length > 0 && showHistory && displayCurrentSearchHistory}
      </div>

    </>
  );
}

export default PokeDexSearchHistory;