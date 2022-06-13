import { Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import FavoriteCharactersPage from './pages/FavoriteCharactersPage';

import classes from './App.module.css';

function App() {
  return (
    <div className="App">
      <header className={classes.header}>
        <h1>
          <Link to="home">Rick and Morty Api</Link>
        </h1>
        <nav>
          <Link to="favorite">Favorite</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<HomePage />}></Route>
        <Route path="character/:id" element={<CharacterPage />}></Route>
        <Route path="favorite" element={<FavoriteCharactersPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
