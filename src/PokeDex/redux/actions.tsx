// actions.ts
import { createAction } from '@reduxjs/toolkit';

export const SET_POKEMON_DATA = 'pokedex/setPokemonData';
export const SET_IS_LOADING = 'pokedex/setIsLoading';
export const SET_CURRENT_POKEMON_OBJ = 'pokedex/setCurrentPokemonObj';
export const SET_CURRENT_SET_OF_POKEMON_URL = 'pokedex/setCurrentSetOfPokemonUrl';
export const SET_NEXT_SET_OF_POKEMON_URL = 'pokedex/setNextSetOfPokemonUrl';
export const SET_PREV_SET_OF_POKEMON_URL = 'pokedex/setPrevSetOfPokemonUrl';
export const SET_INDEX_OF_FIRST_POKEMON_IN_SET = 'pokedex/setIndexOfFirstPokemonInSet';

export const setSearchPhrase = createAction<string>('pokedex/setSearchPhrase');

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

// Define action creators using createAction from @reduxjs/toolkit
export const setPokemonData = createAction<PokemonLimitedInfo[]>(SET_POKEMON_DATA);
export const setIsLoading = createAction<boolean>(SET_IS_LOADING);
export const setCurrentPokemonObj = createAction<PokemonIndividualInfo | undefined>(SET_CURRENT_POKEMON_OBJ);
export const setCurrentSetOfPokemonUrl = createAction<string>(SET_CURRENT_SET_OF_POKEMON_URL);
export const setNextSetOfPokemonUrl = createAction<string>(SET_NEXT_SET_OF_POKEMON_URL);
export const setPrevSetOfPokemonUrl = createAction<string>(SET_PREV_SET_OF_POKEMON_URL);
export const setIndexOfFirstPokemonInSet = createAction<number>(SET_INDEX_OF_FIRST_POKEMON_IN_SET);
