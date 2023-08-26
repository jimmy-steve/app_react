import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import PostPicture from "./components/page/PostPicture";
import Album from "./components/page/Album";
import ReadMe from "./components/page/ReadMe";
import Package from "./components/page/Package";
import GitIgnore from "./components/page/GitIgnore";
import Src from "./components/page/Src";
import Public from "./components/page/Public";
import Node from "./components/page/Node";
import MealPlanner from "./components/page/MealPlanner";
import Recipe from "./components/page/Recipe";

import Pokedex from "./components/page/Pokedex";
import Pokemon from "./components/page/Pokemon";
import Picture from "./components/page/Picture";
import BlockChain from "./components/page/BlockChain";
import ThreeD from "./components/page/ThreeD";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/pictures/new" element={<PostPicture />}></Route>
        <Route exact path="/pictures/:id" element={<Picture />}></Route>
        <Route exact path="/album" element={<Album />}></Route>
        <Route exact path="/readme" element={<ReadMe />}></Route>
        <Route exact path="/package" element={<Package />}></Route>
        <Route exact path="/gitignore" element={<GitIgnore />}></Route>
        <Route exact path="/src" element={<Src />}></Route>
        <Route exact path="/public" element={<Public />}></Route>
        <Route exact path="/node" element={<Node />}></Route>
        <Route exact path="/mealplanner" element={<MealPlanner />}></Route>
        <Route exact path="/recipes" element={<Recipe />}></Route>
        <Route exact path="/pokedex" element={<Pokedex />}></Route>
        <Route exact path="/pokemon/:pokemonName" element={<Pokemon />}></Route>
        <Route exact path="/blockchain" element={<BlockChain />}></Route>
        <Route exact path="/three-d" element={<ThreeD />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
