import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/page/auth/Login";
import Register from "./components/page/auth/Register";
import ForgotPassword from "./components/page/auth/ForgotPassword";
import ContactForm from "./components/page/auth/ContactForm";
import About from "./components/page/About";
import GalleryPhoto from "./components/incs/photo/GalleryPhoto";
import YourProject from "./components/page/your/YourProject";
import ProjectDetail from "./components/page/project/ProjectDetail";
import Script from "./components/page/Script";

import Album from "./components/page/picture/Album";
import ReadMe from "./components/page/ReadMe";

import Recipe from "./components/page/recipe/Recipe";
import RecipeDetail from "./components/page/recipe/RecipeDetail";
import Article from "./components/page/article/Article";
import ArticleDetail from "./components/page/article/ArticleDetail";

import Pokedex from "./components/page/pokemon/Pokedex";
import Pokemon from "./components/page/pokemon/Pokemon";
import Picture from "./components/page/picture/Picture";
import Dashboard from "./components/page/Dashboard";
import AdminDashboard from "./components/page/admin/AdminDashboard";
import YourArticle from "./components/page/your/YourArticle";
import PostArticle from "./components/page/article/PostArticle";
import Category from "./components/page/article/Category";
import AllCategory from "./components/page/article/AllCategory";

import YourPicture from "./components/page/your/YourPicture";
import PostPicture from "./components/page/picture/PostPicture";
import YourRecipe from "./components/page/your/YourRecipe";
import PostRecipe from "./components/page/recipe/PostRecipe";
import EditArticleWithParams from "./components/page/article/EditArticleWithParams";
import EditPictureWithParams from "./components/page/picture/EditPictureWithParams";
import EditRecipeWithParams from "./components/page/recipe/EditRecipeWithParams";

import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/register" element={<Register/>}></Route>
                <Route exact path="/forgot-password" element={<ForgotPassword/>}></Route>
                <Route exact path="/contact" element={<ContactForm/>}></Route>
                <Route exact path="/about" element={<About/>}></Route>
                <Route exact path="/photo-gallery" element={<GalleryPhoto/>}></Route>
                <Route exact path="/projects" element={<YourProject/>}></Route>
                <Route exact path="/projects/:id" element={<ProjectDetail/>}></Route>
                <Route exact path="/script" element={<Script/>}></Route>

                <Route exact path="/readme" element={<ReadMe/>}></Route>
                <Route exact path="/pokedex" element={<Pokedex/>}></Route>
                <Route exact path="/pokemon/:pokemonName" element={<Pokemon/>}></Route>

                <Route exact path="/blog" element={<Article/>}></Route>
                <Route exact path="/blog/:id" element={<ArticleDetail/>}></Route>
                <Route exact path="/blog/new" element={<PostArticle/>}></Route>
                <Route exact path="/blog/edit/:id" element={<EditArticleWithParams/>}/>
                <Route exact path="/blog/category/:id" element={<Category/>}></Route>
                <Route exact path="/blog/category/all" element={<AllCategory/>}></Route>

                <Route exact path="/recipes" element={<Recipe/>}></Route>
                <Route exact path="/recipes/:id" element={<RequireAuth><RecipeDetail/></RequireAuth>}></Route>
                <Route exact path="/recipes/new" element={<RequireAuth><PostRecipe/></RequireAuth>}></Route>
                <Route exact path="/recipes/edit/:id" element={<EditRecipeWithParams/>}/>

                <Route exact path="/album" element={<Album/>}></Route>
                <Route exact path="/pictures/:id" element={<RequireAuth><Picture/></RequireAuth>}></Route>
                <Route exact path="/pictures/new" element={<RequireAuth><PostPicture/></RequireAuth>}></Route>
                <Route exact path="/pictures/edit/:id" element={<EditPictureWithParams/>}/>

                <Route exact path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}/>
                <Route exact path="/your-blog" element={<RequireAuth><YourArticle/></RequireAuth>}/>
                <Route exact path="/your-picture" element={<RequireAuth><YourPicture/></RequireAuth>}/>
                <Route exact path="/your-recipe" element={<RequireAuth><YourRecipe/></RequireAuth>}/>
                <Route exact path="/super-admin" element={<RequireAuth><AdminDashboard/></RequireAuth>}/>


            </Routes>
        </BrowserRouter>
    );
}

export default App;
