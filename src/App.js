import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import ContactForm from "./components/page/ContactForm";
import About from "./components/page/About";

import Album from "./components/page/Album";
import ReadMe from "./components/page/ReadMe";

import Recipe from "./components/page/Recipe";
import RecipeDetail from "./components/page/RecipeDetail";
import Article from "./components/page/Article";
import ArticleDetail from "./components/page/ArticleDetail";

import Pokedex from "./components/page/Pokedex";
import Pokemon from "./components/page/Pokemon";
import Picture from "./components/page/Picture";
import Dashboard from "./components/page/Dashboard";
import YourArticle from "./components/page/your/YourArticle";
import PostArticle from "./components/page/your/PostArticle";
import EditArticle from "./components/page/your/EditArticle";
import YourPicture from "./components/page/your/YourPicture";
import PostPicture from "./components/page/your/PostPicture";
import YourRecipe from "./components/page/your/YourRecipe";
import PostRecipe from "./components/page/your/PostRecipe";
import EditArticleWithParams from "./components/page/EditArticleWithParams";

import RequireAuth from "./components/RequireAuth";

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/contact" element={<ContactForm />}></Route>
            <Route exact path="/about" element={<About />}></Route>

            <Route exact path="/readme" element={<ReadMe />}></Route>
            <Route exact path="/pokedex" element={<Pokedex />}></Route>
            <Route exact path="/pokemon/:pokemonName" element={<Pokemon />}></Route>

            <Route exact path="/blog" element={<Article />}></Route>
            <Route exact path="/blog/:id" element={<ArticleDetail />}></Route>
            <Route exact path="/blog/new" element={<PostArticle />}></Route>
            <Route exact path="/blog/edit/:id" element={<EditArticleWithParams />}/>


            <Route exact path="/recipes" element={<Recipe />}></Route>
            <Route exact path="/recipes/:id" element={<RequireAuth><RecipeDetail /></RequireAuth>}></Route>
            <Route exact path="/recipes/new" element={<RequireAuth><PostRecipe /></RequireAuth>}></Route>

            <Route exact path="/album" element={<Album />}></Route>
            <Route exact path="/pictures/:id" element={<RequireAuth><Picture /></RequireAuth>}></Route>
            <Route exact path="/pictures/new" element={<RequireAuth><PostPicture /></RequireAuth>}></Route>

            <Route exact path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
            <Route exact path="/your-blog" element={<RequireAuth><YourArticle /></RequireAuth>}/>
            <Route exact path="/your-picture" element={<RequireAuth><YourPicture /></RequireAuth>}/>
            <Route exact path="/your-recipe" element={<RequireAuth><YourRecipe /></RequireAuth>}/>


          </Routes>
        </BrowserRouter>
  );
}

export default App;
