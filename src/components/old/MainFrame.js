import React, { useState, useEffect } from "react";
import useInterval from "use-interval";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Planning from "./planning/Planning";
import RecipesList from "./recipesList/RecipesList";
import IngredientsList from "./ingredientsList/IngredientsList";
import "./MainFrame.scss";
import UserIdContext from "./userIdContext";

const API_URL = "http://localhost:8000";

const useActiveTab = (defaultTab) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || defaultTab
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get("tab") || defaultTab;

    setActiveTab(activeTab);
  }, [location.search, setActiveTab, defaultTab]);

  return [activeTab, setActiveTab, searchParams];
};

const MainFrame = ({ userInfo }) => {
  const navigate = useNavigate();
  const userId = userInfo?.id;

  console.log("userId", userId);
  const location = useLocation();
  const [activeTab, setActiveTab] = useActiveTab("planning");
  const [recipes, setRecipes] = useState([]);

  useInterval(() => {
    const fetchRecipes = async () => {      
      try {
        const response = await axios.get(
          `${API_URL}/api/Recipes?userId=${userId}`
        );
        setRecipes(response.data);
      } catch (error) {
        setRecipes([]);
        console.error(error);
      }
    };
     fetchRecipes();
  }, 5000);


  const handleSelect = (k) => {
    const searchParams = new URLSearchParams(location.search);
    const source = searchParams.get("source");
    if (source === "add") {
      console.log("source ADD");
    }
    setActiveTab(k);
    navigate(`/mainFrame?tab=${k}`);
  };
  console.log("MainFrame Recipes: " + recipes)

  return (
    <div className="container-fluid gray">
      <div className="row">
        <div className="col-10 mx-auto border m-3">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={handleSelect}
            className="tabs mb-3 m-1"
          >
            <Tab
              eventKey="planning"
              title="Planification de la semaine"
              tabClassName="border rounded-top m-1 tab tab--planning"
            >
              <UserIdContext.Provider value={userId}>
                <Planning />
              </UserIdContext.Provider>
            </Tab>
            <Tab
              eventKey="ingredients"
              title="Ingrédients de la semaine"
              tabClassName="border rounded-top m-1 tab tab--ingredients"
            >
              <IngredientsList />
            </Tab>

            <Tab
              eventKey="recipes"
              title="Liste des recettes"
              tabClassName="border rounded-top m-1 tab tab--recipes"
            >
              <RecipesList userId={userId} recipes={recipes} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
