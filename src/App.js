import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import PostPicture from "./components/page/PostPicture";
import Album from "./components/page/Album";
import ReadMe from "./components/page/ReadMe";
import GitIgnore from "./components/page/GitIgnore";

import MealPlanner from "./components/page/MealPlanner";
import Recipe from "./components/page/Recipe";
import RecipeDetail from "./components/page/RecipeDetail";
import Article from "./components/page/Article";
import ArticleDetail from "./components/page/ArticleDetail";

import Pokedex from "./components/page/Pokedex";
import Pokemon from "./components/page/Pokemon";
import Picture from "./components/page/Picture";
import ThreeD from "./components/page/ThreeD";
import Dashboard from "./components/page/Dashboard";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/album" element={<Album />}></Route>
            <Route exact path="/recipes" element={<Recipe />}></Route>

            <Route exact path="/blog" element={<Article />}></Route>
            <Route exact path="/blog/:id" element={<ArticleDetail />}></Route>

            <Route exact path="/readme" element={<ReadMe />}></Route>
            <Route exact path="/gitignore" element={<GitIgnore />}></Route>
            <Route exact path="/mealplanner" element={<MealPlanner />}></Route>
            <Route exact path="/pokedex" element={<Pokedex />}></Route>
            <Route exact path="/pokemon/:pokemonName" element={<Pokemon />}></Route>
            <Route exact path="/three-d" element={<ThreeD />}></Route>

            <Route exact path="/recipes/:id" element={<RequireAuth><RecipeDetail /></RequireAuth>}></Route>
            <Route exact path="/pictures/:id" element={<RequireAuth><Picture /></RequireAuth>}></Route>
            <Route exact path="/pictures/new" element={<RequireAuth><PostPicture /></RequireAuth>}></Route>
            <Route exact path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
