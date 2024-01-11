import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your state
interface PokeDexState {
  pokemonData: null | any; // Replace 'any' with the actual type of your pokemonData
  isLoading: boolean;
  currentPokemonObj: null | any; // Replace 'any' with the actual type of your currentPokemonObj
  currentSetOfPokemonUrl: string;
  nextSetOfPokemonUrl: string;
  prevSetOfPokemonUrl: string;
  indexOfFirstPokemonInSet: number;
}

// Define the initial state
const initialState: PokeDexState = {
  pokemonData: null,
  isLoading: true,
  currentPokemonObj: null,
  currentSetOfPokemonUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=50',
  nextSetOfPokemonUrl: '',
  prevSetOfPokemonUrl: '',
  indexOfFirstPokemonInSet: 1,
};

// Create a slice
export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setPokemonData: (state, action: PayloadAction<any>) => {
      state.pokemonData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentPokemonObj: (state, action: PayloadAction<any>) => {
      state.currentPokemonObj = action.payload;
    },
    setCurrentSetOfPokemonUrl: (state, action: PayloadAction<string>) => {
      state.currentSetOfPokemonUrl = action.payload;
    },
    setNextSetOfPokemonUrl: (state, action: PayloadAction<string>) => {
      state.nextSetOfPokemonUrl = action.payload;
    },
    setPrevSetOfPokemonUrl: (state, action: PayloadAction<string>) => {
      state.prevSetOfPokemonUrl = action.payload;
    },
    setIndexOfFirstPokemonInSet: (state, action: PayloadAction<number>) => {
      state.indexOfFirstPokemonInSet = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setPokemonData,
  setIsLoading,
  setCurrentPokemonObj,
  setCurrentSetOfPokemonUrl,
  setNextSetOfPokemonUrl,
  setPrevSetOfPokemonUrl,
  setIndexOfFirstPokemonInSet,
} = pokedexSlice.actions;

export const selectPokedex = (state: { pokedex: PokeDexState }) => state.pokedex;

export default pokedexSlice.reducer;
