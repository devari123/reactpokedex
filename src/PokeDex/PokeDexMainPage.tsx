import React, { useState, useEffect, useMemo, CSSProperties } from 'react';
import PokemonPagination from './PokemonPagination';

const PokeDexMainPage = () => {
  // Interface defintions
  // This interface defines an object that holds a variable, name, for each Pokemon in a given set of Pokemon
  interface PokemonLimitedInfo {
    name: string;
  }

  // State variable defintions
  const [pokemonData, setPokemonData] = useState<PokemonLimitedInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSetOfPokemonUrl, setCurrentSetOfPokemonUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/?limit=50");
  const [nextSetOfPokemonUrl, setNextSetOfPokemonUrl] = useState<string>("");
  const [prevSetOfPokemonUrl, setPrevSetOfPokemonUrl] = useState<string>("");
  const [indexOfFirstPokemonInSet, setIndexOfFirstPokemonInSet] = useState<number>(1);

  // Styling definitions
  const componentRoot: CSSProperties = {
    backgroundColor: 'black',
    minHeight: '100vh',
  }
  const pokemonDisplayRoot: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
  }
  const screenText: CSSProperties = {
    color: 'white',
  }

  // Function definitions

  // This function fetches the next set of pokemon from the pokemon api
  const getNextSetOfPokemon = () => {
    setIndexOfFirstPokemonInSet(indexOfFirstPokemonInSet + 50);
    setCurrentSetOfPokemonUrl(nextSetOfPokemonUrl)
  }

  // This function fecthes the previous set of pokemon from the pokemon api
  const getPreviousSetOfPokemon = () => {
    if (indexOfFirstPokemonInSet !== 1) {
      setIndexOfFirstPokemonInSet(indexOfFirstPokemonInSet - 50)
    }
    setCurrentSetOfPokemonUrl(prevSetOfPokemonUrl)
  }

  /*
    Although looping over 50 pokemon objects is not necessarily an expensive function,
    this memoizes a function that could be potentially expensive depending on how the 'limit' query is defined in 'currentSetOfPokemonUrl'
  */
  const displayCurrentPokemon = useMemo(() => {

    // This function creates and returns an array of jsx elements that displays all the pokemon in a formatted manner
    const constructHTMLPokemonDisplay = (pokeData: PokemonLimitedInfo[] | null) => {
      // These are styles for the display of the current list of pokemon
      const pokemonDisplayCard: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
      }
      const pokemonDisplayName: CSSProperties = {
        color: 'white',
      }
      const list: JSX.Element[] = [];
      
      /* 
      This is the index of the first pokemon in the current set of pokemon being viewed.
      This helps keep track of what the index of a pokemon object is in relation to all 1302 pokemon objects instead of just the current set of pokemon
      */
      let pokemonIndex = indexOfFirstPokemonInSet;

      // return a no pokemon right now message if no pokemonData is available
      if (!pokeData || pokeData.length === 0) {
        return (
          <div key="noPokemon">
            hi, no pokemon right now
          </div>
        )
      }

      // otherwise, loop through each object of pokemonData, the current set of pokemon, and format how its displayed on screen
      pokeData.forEach((pokemon: PokemonLimitedInfo) => {
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
            <button>
              VIEW POKEMON
            </button>
          </div>
        );
        pokemonIndex++
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
            Catching Pokemon ...
          </p>
      )}
      {(pokemonData && pokemonData.length > 0 && !isLoading) && (
        <>
          <PokemonPagination 
            getNextSetOfPokemon={nextSetOfPokemonUrl ? getNextSetOfPokemon : null}
            getPreviousSetOfPokemon={prevSetOfPokemonUrl ? getPreviousSetOfPokemon : null}
          />
          <div style={pokemonDisplayRoot}>
            {displayCurrentPokemon}
          </div>
        </>
      )}
    </div>
  )
}

export default PokeDexMainPage;