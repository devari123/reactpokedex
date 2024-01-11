import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './PokeDex/redux/pokeslice';

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

export interface RootState {
  pokedex: {
    pokemonData: PokemonLimitedInfo[] | null;
    isLoading: boolean;
    currentPokemonObj: PokemonIndividualInfo | undefined;
    currentSetOfPokemonUrl: string;
    nextSetOfPokemonUrl: string;
    prevSetOfPokemonUrl: string;
    indexOfFirstPokemonInSet: number;
  };
}

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer
  },
});

export default store;