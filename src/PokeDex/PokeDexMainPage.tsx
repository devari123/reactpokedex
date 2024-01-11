import React, { useState, useRef, useEffect, useCallback, useMemo, CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPokemonData,
  setIsLoading,
  setCurrentPokemonObj,
  setCurrentSetOfPokemonUrl,
  setNextSetOfPokemonUrl,
  setPrevSetOfPokemonUrl,
  setIndexOfFirstPokemonInSet,
} from './redux/pokeslice';
import { RootState } from '../store';
import PokemonPagination from './PokeDexPagination';
import PokeDexSearchBar from './PokeDexSearchBar';
import PokeDexSearchHistory from './PokeDexSearchHistory';

// Interface defintions
// This interface defines an object that holds a variable, name, for each Pokemon in a given set of Pokemon
interface PokemonLimitedInfo {
  name: string;
}

interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

const PokeDexMainPage = () => {
  // Variable defintions
  const selectedPokemonRef = useRef<HTMLDivElement>(null);
  // const pokemonLimitPerPage = 50;
  const baseImgURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';
  const baseAPIURL = 'https://pokeapi.co/api/v2/pokemon/';
  const dispatch = useDispatch();
  const {
    pokemonData,
    isLoading,
    currentPokemonObj,
    currentSetOfPokemonUrl,
    nextSetOfPokemonUrl,
    prevSetOfPokemonUrl,
    indexOfFirstPokemonInSet,
  } = useSelector((state: RootState) => state.pokedex);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<Array<string>>(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("stats");

  // Styling definitions
  const componentRoot: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4d4855',
    backgroundImage: 'linear-gradient(147deg, #4d4855 0%, #000000 74%)',
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
  };
  const errorMessages: CSSProperties = {
    width: '27%',
    backgroundColor: 'rgb(255, 0, 0, 0.5)',
    position: 'absolute',
    top: '3.2%',
    right: '2%',
    zIndex: 100,
    textAlign: 'center',
    color: 'white'
  }
  const pokemonDisplayRoot: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    backgroundColor: (currentPokemonObj && currentPokemonObj.id) ? '#4d4855' : 'transparent',
    backgroundImage: (currentPokemonObj && currentPokemonObj.id) ? 'linear-gradient(147deg, #4d4855 0%, #000000 74%)' : 'transparent',
    paddingTop: '11%',
    // maxHeight: (currentPokemonObj && currentPokemonObj.id) ? '17.5vh': '1000vh',
    overflow: (currentPokemonObj && currentPokemonObj.id) ? 'auto' : 'hidden',
  };
  const screenText: CSSProperties = {
    color: 'white',
  };
  const selectedPokemonRoot: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    minHeight: '62vh',
  };
  const selectedPokemonImg: CSSProperties = {
    width: '43%',
    position: 'absolute',
    zIndex: 10,
  };
  const selectedPokemonDisplayName: CSSProperties = {
    color: 'white',
    margin: '0.5% 2%',
    fontSize: '3.55rem',
    zIndex: 11,
  };
  const findPokemonText: CSSProperties = {
    width: '100%', fontSize: '4rem', textAlign: 'right',
    marginRight: '6%', color: 'white',
    marginBottom: '1.5%'
  };
  const pokeCard: CSSProperties = {
    width: '35%',
    backgroundColor: 'rgb(255, 255, 255, 0.5)',
    position: 'absolute',
    top: '28%',
    right: '16%',
    height: '58vh',
    zIndex: 31,
    overflow: 'auto',
    borderRadius: '10%',
    padding: '1.5%'
  };
  const statsHeading: CSSProperties = {
    fontWeight: 600,
    fontSize: '2.5rem',
    color: 'white',
    marginLeft: '4%'
  };
  const typesContainer: CSSProperties = {
    display: 'flex', flexWrap: 'wrap', maxWidth: '30%'
  };
  const statsContainer: CSSProperties = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'
  };
  const movesContainer: CSSProperties = {
    display: 'flex', flexWrap: 'wrap', width: '100%',
  };
  const viewPokemonButton: CSSProperties = {
    alignSelf: 'center', width: '49%', backgroundColor: 'green', margin: '4% 0% 1%', height: '4vh', color: 'white'
  };
  const currentPokemonNumber: CSSProperties = {
    color: 'white',
    fontWeight: 600,
    fontSize: '4.5rem',
    zIndex: 30
  };

  // conditional styling for the background of ref component
  const getBackgroundColor = (types: PokemonTypes[]) => {
    if (types && types[0]) {
      switch (types[0].type.name) {
        case 'fire':
          return '#f94327';
        case 'water':
          return '#045de9';
        case 'poison':
          return '#6247aa';
        case 'dragon':
          return '#fbb034';
        case 'psychic':
          return '#84fb95';
        case 'fairy':
          return '#84fb95';
        case 'electric':
          return '#ffef00';
        case 'steel':
          return '#2d3436';
        case 'flying':
          return '#fffffc';
        case 'ground':
          return '#230903';
        case 'bug':
          return 'background-color: #edb88b';
        case 'ghost':
          return '#c3cbdc';
        case 'grass':
          return '#00b712';
        case 'dark':
          return '#a399b2';
        case 'fighting':  
          return '#166d3b';
        case 'rock':
          return '#f9d29d';
        case 'normal':  
          return '#aee1f9';
        case 'stellar':
          return '#17f9f2';
        default:
          return 'black';
      }
    }
    return 'black';
  };

  const getBackgroundImage = (types: PokemonTypes[]) => {
    if (types && types[0]) {
      switch (types[0].type.name) {
        case 'fire':
          return 'linear-gradient(316deg, #f94327 0%, #ff7d14 74%)';
        case 'water':
          return 'linear-gradient(315deg, #045de9 0%, #09c6f9 74%)';
        case 'poison':
          return 'linear-gradient(316deg, #6247aa 0%, #a594f9 74%)';
        case 'dragon':
          return 'linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)';
        case 'psychic':
          return 'linear-gradient(315deg, #84fb95 0%, #cef576 74%)';
        case 'fairy':
          return 'linear-gradient(315deg, #84fb95 0%, #cef576 74%)';
        case 'electric':
          return 'linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)';
        case 'steel':
          return 'linear-gradient(315deg, #2d3436 0%, #d3d3d3 74%)';
        case 'flying':
          return 'linear-gradient(315deg, #fffffc 0%, #beb7a4 74%)';
        case 'ground':
          return 'linear-gradient(315deg, #230903 0%, #d3b88c 74%)';
        case 'bug':
          return 'linear-gradient(315deg, #edb88b 0%, #cd5334 74%)';
        case 'ghost':
          return 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)';
        case 'grass':
          return 'linear-gradient(315deg, #00b712 0%, #5aff15 74%)';
        case 'dark':
          return 'linear-gradient(147deg, #a399b2 0%, #4d4855 74%)';
        case 'fighting':
          return 'linear-gradient(147deg, #166d3b 0%, #000000 74%)';
        case 'rock':
          return 'linear-gradient(315deg, #f9d29d 0%, #ffd8cb 74%)';
        case 'normal':
          return 'linear-gradient(315deg, #aee1f9 0%, #f6ebe6 74%)';
        case 'stellar':
          return 'linear-gradient(315deg, #17f9f2 0%, #b0f9a9 74%)';
        default:
          return 'black';
      }
    }
    return 'black';
  };

  // Function definitions
  // This function fetches the next set of pokemon from the pokemon api
  const getNextSetOfPokemon = () => {
    /* 
      This will be the index of the first pokemon in the current set of pokemon being viewed.
      This helps keep track of what the index of a pokemon object is in relation to all 1302 pokemon objects, instead of just in relation to
      the current set of pokemon
    */
    dispatch(setIndexOfFirstPokemonInSet(indexOfFirstPokemonInSet + 50));
    dispatch(setCurrentSetOfPokemonUrl(nextSetOfPokemonUrl));
  }

  // This function fecthes the previous set of pokemon from the pokemon api
  const getPreviousSetOfPokemon = () => {
    /* 
      IndexOfFirstPokemonInSet will be the index of the first pokemon in the current set of pokemon being viewed.
      This helps keep track of what the index of a pokemon object is in relation to all 1302 pokemon objects instead of just in relation to
       the current set of pokemon
    */
    dispatch(setIndexOfFirstPokemonInSet(indexOfFirstPokemonInSet - 50));
    dispatch(setCurrentSetOfPokemonUrl(prevSetOfPokemonUrl));
  }

  // findThisPokemon uses a string value to append to the end of the pokemon api url to retrieve info on an individual pokemon
  const findThisPokemon = useCallback(
    // findThisPokemon expects two parameters, a nonempty string to append to the pokemon api url, and a true or false for if the function should store the string inside of searchHistory
    async (somePhrase: string, addToSearchHistory: boolean) => {
      const isNumericString = !isNaN(Number(somePhrase));
      // a regular expression to check if the string has no numbers present
      const hasNoNumbers = /^[^0-9]*$/.test(somePhrase);

      // validate whether 'somePhrase' is an empty string, null, or something besides a number or a string with no numbers
      if (somePhrase !== null && somePhrase.trim() !== '' && ((isNumericString && parseInt(somePhrase,10).toString().length <= 4) || hasNoNumbers)) {
        // if true was passed in for the 'addToSearchHistory' parameter, add the value to the searchHistory value
        if (addToSearchHistory) {
          setSearchHistory((prevHistory) => [...prevHistory, somePhrase]);
        }
        const urlForRequest = (isNumericString) ? `${baseAPIURL}${parseInt(somePhrase,10)}` : `${baseAPIURL}${somePhrase.toLowerCase()}`;
        try {
          // Fetch data from the current URL
          const response = await fetch(urlForRequest);
  
          // Parse the response as json
          const json = await response.json();
  
          dispatch(setCurrentPokemonObj(json));
        } catch (error) {
          // Display a div as an alert that the requested pokemon can not be pulled
          setErrorMessage("Sorry, We Couldnt Find Any Information On That Pokemon");
          setError(true);
          setTimeout(() => { setError(false); }, 3000);
        }
      } else {
        // Display a div as an alert that the user input is invalid and only numbers and names will be accepted
        setErrorMessage("You must enter a valid number or name of a pokemon");
        setError(true);
        setTimeout(() => { setError(false); }, 3000);
      }
    },
    []
  );

  /*
    Although looping over 50 pokemon objects is not necessarily an expensive function,
    this memoizes a function that could be potentially expensive depending on how the 'limit' query is defined in 'currentSetOfPokemonUrl',
    as it iterates over the current set of Pokemon, which can be anywhere from 1 to 1302 pokemon, and displays each Pokemon's information
  */
  const displayCurrentPokemon = useMemo(() => {

    // This function creates and returns an array of jsx elements that displays all the pokemon in a formatted manner
    const constructHTMLPokemonDisplay = (pokeData: PokemonLimitedInfo[] | null) => {
      // These are styles for the display of the current list of pokemon
      const pokemonDisplayCard: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: '14%',
        margin: '1%',
      };
      const pokemonDisplayName: CSSProperties = {
        color: 'white',
        textAlign: 'center',
      };

      // defining an array that will hold jsx elements
      const list: JSX.Element[] = [];
      
      // return a no pokemon right now message if no pokemonData is available
      if (!pokeData || pokeData.length === 0) {
        return (
          <div key="noPokemon">
            hi, no pokemon right now
          </div>
        )
      }

      // otherwise, loop through each object of pokemonData, the current set of pokemon, and format how its displayed on screen
      pokeData.forEach((pokemon: PokemonLimitedInfo, index) => {
        /* 
        This is the index of the first pokemon in the current set of pokemon being viewed.
        This helps keep track of what the index of a pokemon object is in relation to all 1302 pokemon objects instead of just the current set of pokemon
        */
        const pokemonIndex = indexOfFirstPokemonInSet + index;

        list.push(
          <div style={pokemonDisplayCard} key={`pokemon${pokemonIndex}`}>
            <img
              src={`${baseImgURL}${pokemonIndex}.png`}
              alt="imageofpokemon"
              onClick={() => findThisPokemon(String(pokemonIndex), false)}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {

                // Handle image loading errors and replace it with a default image
                const imgElement = e.currentTarget;
                imgElement.src = `${process.env.PUBLIC_URL}/pokeball.png`;
                imgElement.alt = 'defaultImage';

              }}
            />
            <p style={pokemonDisplayName}>
              {pokemon.name}
            </p>
            {pokemonIndex && (
              <button style={viewPokemonButton} onClick={() => findThisPokemon(String(pokemonIndex), false)}>
                VIEW POKEMON
              </button>
            )}
          </div>
        );
      });

      return list;
    };

    return constructHTMLPokemonDisplay(pokemonData);
  }, [pokemonData, indexOfFirstPokemonInSet, findThisPokemon])

  useEffect(() => {
    let ignore = false;

    // this is a function to fetch the list of pokemon from the pokemon api
    const fetchPokemon = async () => {
      try {
        // Fetch data from the current URL
        const response = await fetch(currentSetOfPokemonUrl);

        // Parse the response as json
        const json = await response.json();

        // If the component is still mounted, update the state variables
        if (!ignore) {
          dispatch(setNextSetOfPokemonUrl(json.next));
          dispatch(setPrevSetOfPokemonUrl(json.previous));
          dispatch(setPokemonData(json.results));
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        setErrorMessage("We were unable to fetch the data at this time");
        setError(true);
        setTimeout(() => { setError(false); }, 3000);
      }
    };

    if ((currentSetOfPokemonUrl === prevSetOfPokemonUrl) || (currentSetOfPokemonUrl === nextSetOfPokemonUrl) || (!pokemonData || pokemonData.length <= 0)) {
      // Call the fetchPokemon function when the component mounts or when currentSetOfPokemonUrl changes
      fetchPokemon();
    }

    const localStorageSearchHistory = localStorage.getItem('searchHistory');
    if (localStorageSearchHistory && localStorageSearchHistory.length && searchHistory && localStorageSearchHistory.length !== searchHistory.length) {
      // Save search history to localStorage
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    if (selectedPokemonRef.current) {
      const types = currentPokemonObj?.types;
      if (types) {
        const backgroundColor = getBackgroundColor(types);
        const backgroundImage = getBackgroundImage(types);
        selectedPokemonRef.current.style.backgroundColor = backgroundColor;
        selectedPokemonRef.current.style.backgroundImage = backgroundImage;
      }
    }

    // This is a Cleanup function that sets the ignore variable to true when the component is unmounted
    return () => {
      ignore = true;
    }
  }, [currentSetOfPokemonUrl, searchHistory, nextSetOfPokemonUrl, prevSetOfPokemonUrl, pokemonData, currentPokemonObj, dispatch]);

  return (
    <div ref={selectedPokemonRef} style={componentRoot}>
      {isLoading && (
          <p style={screenText}>
            Gotta Catch Em All ...
          </p>
      )}
      {(pokemonData && pokemonData.length > 0 && !isLoading) && (
        <>
          {(currentPokemonObj && currentPokemonObj.id) && (
            <div style={selectedPokemonRoot}>
              <h1 style={selectedPokemonDisplayName}>{currentPokemonObj.name.toUpperCase()}</h1>
              <img src={`${baseImgURL}${currentPokemonObj.id}.png`} alt="" style={selectedPokemonImg} />
              <p style={currentPokemonNumber}>
                {`#${currentPokemonObj.id}`}
              </p>
              <div style={pokeCard}>
                <h1 style={statsHeading} onClick={() => setCurrentCategory("stats")}>
                  STATS
                </h1>
                {/* <h1 style={statsHeading} onClick={() => setCurrentCategory("moves")}>
                  MOVES
                </h1> */}
                {/* <h1 style={statsHeading} onClick={() => setCurrentCategory("abilities")}>
                  ABILITIES
                </h1> */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {(currentCategory === "types") && (
                    <div style={typesContainer}>
                      {currentPokemonObj && currentPokemonObj.types.map((type) => {
                        return (
                          <div>
                            {type.type.name}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {currentCategory === "abilities" && (
                    <div style={typesContainer}>
                      {currentPokemonObj && currentPokemonObj.abilities.map((ability) => {
                        return (
                          <div>
                            {ability.ability.name}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {(currentCategory === "moves") && (
                    <div style={movesContainer}>
                      {currentPokemonObj && currentPokemonObj.moves.map((move) => {
                        return (
                          <div style={{ minWidth: '25%', fontWeight: 600 }}>
                            {move.move.name}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {(currentCategory === "stats") && (
                    <div style={statsContainer}>
                      {currentPokemonObj && currentPokemonObj.stats.map((stat) => {
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', margin: '1.5% 0%' }}>
                            <p style={{ alignSelf: 'flex-start', margin: '1% 0% 1% 13%', color: 'white', fontWeight: 500 }}>
                              {stat.stat.name.toUpperCase()}
                            </p>
                            <span
                              style={{
                                height: '25px',
                                width: '75%',
                                backgroundColor: '#bbb',
                                borderRadius: '0%',
                                display: 'inline-block', 
                              }}
                            >
                              <span style={{ display: 'inline-block', width: (stat.base_stat > 100) ? '100%' : `${stat.base_stat}%`, height: '100%', backgroundColor: 'black' }} />
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              {/* <img src={`${process.env.PUBLIC_URL}/icons8-ocean-64.png`} alt="water"  style={{ zIndex: 1000 }} /> */}
              {/* <p style={screenText}>
                {currentPokemonObj.abilities.map((ability) => {
                    return (
                      {ability.ability.name}
                    )
                  })
                }
              </p> */}
            </div>
          )}
          <PokeDexSearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} findThisPokemon={findThisPokemon}/>
          <PokeDexSearchHistory searchHistory={searchHistory} findThisPokemon={findThisPokemon} setSearchPhrase={setSearchPhrase}/>
          {error && <div style={errorMessages}>{errorMessage}</div>}
          <div style={pokemonDisplayRoot}>
            {(!currentPokemonObj) && (
              <p style={findPokemonText}>
                Find That Pokemon
              </p>
            )}
            <PokemonPagination 
              getNextSetOfPokemon={nextSetOfPokemonUrl ? getNextSetOfPokemon : null}
              getPreviousSetOfPokemon={prevSetOfPokemonUrl ? getPreviousSetOfPokemon : null}
            />
            {displayCurrentPokemon}
          </div>
        </>
      )}
    </div>
  )
}

export default PokeDexMainPage;