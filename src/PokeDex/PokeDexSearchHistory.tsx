import React, { CSSProperties, useMemo } from 'react';


// interface definition of the type of prop expected
interface PokeDexSearchHistoryProps {
  searchHistory: string[] | null;
}

const PokeDexSearchHistory: React.FC<PokeDexSearchHistoryProps> = ({ searchHistory }) => {
  // Styling for the root container
  const previousSearchWordsRoot: CSSProperties = {
    display: 'flex',
    maxWidth: '44%',
    position: 'absolute',
    top: '9%',
    right: '2%',
    overflow: 'auto',
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
      <div style={previousSearchWordChip} key={index}>
        {previousSearchWord}
      </div>
    ));
  }, [searchHistory]);

  // Render the search history component
  return (
    <>
      <p style={{ color: 'white', position: 'absolute', fontWeight: 500, top: '6%', right: '2%'  }}>
        Your Recent Searches
      </p>
      <div style={previousSearchWordsRoot}>
        {searchHistory && searchHistory.length > 0 && displayCurrentSearchHistory}
      </div>
    </>
  );
}

export default PokeDexSearchHistory;