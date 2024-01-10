import React, { useState, useEffect, useMemo, CSSProperties } from 'react';
import PokemonPagination from './PokemonPagination';
import PokeDexSearchBar from './PokeDexSearchBar';

// Interface defintions
// This interface defines an object that holds a variable, name, for each Pokemon in a given set of Pokemon
interface PokemonLimitedInfo {
  name: string;
}

// These interfaces define the a Pokemon's abilities, stats, moves, sprites, and types
interface PokemonAbilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonMoves {
  move: {
    name: string;
  };
}

interface PokemonSprites {
  other: {
    home: {
      front_default: string | null;
    };
  }
}

interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonIndividualInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbilities[];
  moves: PokemonMoves[];
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
}

const PokeDexMainPage = () => {
  // Variable defintions
  const [pokemonData, setPokemonData] = useState<PokemonLimitedInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pokemonLimit = 50;
  const baseImgURL = '';
  const baseAPIURL = 'https://pokeapi.co/api/v2/pokemon/';
  const [currentPokemonObj, setCurrentPokemonObj] = useState<PokemonIndividualInfo>();
  const [currentSetOfPokemonUrl, setCurrentSetOfPokemonUrl] = useState<string>(`${baseAPIURL}?limit=${pokemonLimit}`);
  const [nextSetOfPokemonUrl, setNextSetOfPokemonUrl] = useState<string>("");
  const [prevSetOfPokemonUrl, setPrevSetOfPokemonUrl] = useState<string>("");
  const [indexOfFirstPokemonInSet, setIndexOfFirstPokemonInSet] = useState<number>(1);
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  // Styling definitions
  const componentRoot: CSSProperties = {
    backgroundColor: 'black',
    minHeight: '100vh',
  };
  const pokemonDisplayRoot: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  const screenText: CSSProperties = {
    color: 'white',
  };

  // Function definitions

  // This function fetches the next set of pokemon from the pokemon api
  const getNextSetOfPokemon = () => {
    /* 
      This will be the index of the first pokemon in the current set of pokemon being viewed.
      This helps keep track of what the index of a pokemon object is in relation to all 1302 pokemon objects, instead of just in relation to
      the current set of pokemon
    */
    setIndexOfFirstPokemonInSet(indexOfFirstPokemonInSet + 50);
    setCurrentSetOfPokemonUrl(nextSetOfPokemonUrl);
  }

  // This function fecthes the previous set of pokemon from the pokemon api
  const getPreviousSetOfPokemon = () => {
    /* 
      This will be the index of the first pokemon in the current set of pokemon being viewed.
      This helps keep track of what the index of a pokemon object is in relation to all 1302 pokemon objects instead of just in relation to
       the current set of pokemon
    */
    setIndexOfFirstPokemonInSet(indexOfFirstPokemonInSet - 50);
    setCurrentSetOfPokemonUrl(prevSetOfPokemonUrl);
  }

  // this is a function to fetch the list of pokemon from the pokemon api
  const fetchOnePokemon = async (phrase: string) => {
    const urlForRequest = `${baseAPIURL}${phrase}`;
    try {
      // Fetch data from the current URL
      const response = await fetch(urlForRequest);

      // Parse the response as json
      const json = await response.json();

      setCurrentPokemonObj(json);
    } catch (error) {
      // Log an error message if there's an issue fetching data. This will get changed to remove use of console.log()
      console.log("error pulling data for one pokemon", error);
    }
  };

  const findThisPokemon = (somePhrase: string) => {
    fetchOnePokemon(somePhrase);
  }

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
      };
      const pokemonDisplayName: CSSProperties = {
        color: 'white',
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
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonIndex}.png`}
              alt="imageofpokemon"
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
              <button onClick={() => findThisPokemon(String(pokemonIndex))}>
                VIEW POKEMON
              </button>
            )}
          </div>
        );
      });

      return list;
    };

    return constructHTMLPokemonDisplay(pokemonData);
  }, [pokemonData, indexOfFirstPokemonInSet])

  useEffect(() => {
    let ignore = false;

    // this is a function to fetch the list of pokemon from the pokemon api
    const fetchPokemon = async () => {
      try {
        // Fetch data from the current URL
        const response = await fetch(currentSetOfPokemonUrl)

        // Parse the response as json
        const json = await response.json()

        // If the component is still mounted, update the state variables
        if (!ignore) {
          setNextSetOfPokemonUrl(json.next)
          setPrevSetOfPokemonUrl(json.previous)
          setPokemonData(json.results)
          setIsLoading(false)
        }
      } catch (error) {
        // Log an error message if there's an issue fetching data. This will get changed to remove use of console.log()
        console.log("error pulling data", error)
      }
    };

    // Call the fetchPokemon function when the component mounts or when currentSetOfPokemonUrl changes
    fetchPokemon();

    // This is a Cleanup function that sets the ignore variable to true when the component is unmounted
    return () => {
      ignore = true;
    }
  }, [currentSetOfPokemonUrl]);

  return (
    <div style={componentRoot}>
      {isLoading && (
          <p style={screenText}>
            Gotta Catch Em All ...
          </p>
      )}
      {(pokemonData && pokemonData.length > 0 && !isLoading) && (
        <>
          <PokeDexSearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} findThisPokemon={findThisPokemon}/>
          <PokemonPagination 
            getNextSetOfPokemon={nextSetOfPokemonUrl ? getNextSetOfPokemon : null}
            getPreviousSetOfPokemon={prevSetOfPokemonUrl ? getPreviousSetOfPokemon : null}
          />
          {(currentPokemonObj && currentPokemonObj.id) && (
            <p style={screenText}>
              {currentPokemonObj.abilities[0].ability.name}
            </p>
          )}
          <div style={pokemonDisplayRoot}>
            {displayCurrentPokemon}
          </div>
        </>
      )}
    </div>
  )
}

export default PokeDexMainPage;