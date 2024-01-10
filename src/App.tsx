import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import logo from './logo.svg';

function App() {
  // use lazy.import for efficient importation of the two PokeDex Components
  const PokeDexMainScreen = React.lazy(() => import('./PokeDex/PokeDexMainPage'));
  
  const pokedexRoutes = (
    <Routes>
      <Route path="/" element={<PokeDexMainScreen />} />
    </Routes>
  );

  return (
    <React.Suspense fallback={<center><img src={logo} alt="logo" /></center>}>
      <BrowserRouter>
        {pokedexRoutes}
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
