import dayjs from "dayjs";
import "dayjs/locale/fr"; // importer la locale "fr"
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddRecipeButton from "./AddRecipeButton";
import CardRecipe from "./CardRecipe";
import DetailModal from "./DetailModal";
import axios from "axios";
import "./WeekCalendar.scss";
import UserIdContext from "../userIdContext";

function WeekCalendar() {
  const [userId] = useState(React.useContext(UserIdContext));
  // const userId = React.useContext(UserIdContext);
  console.log("userId by the Context week : ", userId);

  const navigate = useNavigate();
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // trouver la semaine courante
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));
  // initialiser une liste de recettes pour chaque jour de la semaine
  const [sundayRecipes, setSundayRecipes] = useState([]);
  const [mondayRecipes, setMondayRecipes] = useState([]);
  const [tuesdayRecipes, setTuesdayRecipes] = useState([]);
  const [wednesdayRecipes, setWednesdayRecipes] = useState([]);
  const [thursdayRecipes, setThursdayRecipes] = useState([]);
  const [fridayRecipes, setFridayRecipes] = useState([]);
  const [saturdayRecipes, setSaturdayRecipes] = useState([]);

  const [DayList, setDayList] = React.useState([]);

  const handleDetailModalShow = (recipe) => {
    setSelectedRecipe(recipe);
    setDetailModalShow(true);
  };

  const handleDetailModalClose = () => {
    setSelectedRecipe(null);
    setDetailModalShow(false);
  };

  const calculateRecipesForWeek = () => {
    const weekRecipes = [
      sundayRecipes,
      mondayRecipes,
      tuesdayRecipes,
      wednesdayRecipes,
      thursdayRecipes,
      fridayRecipes,
      saturdayRecipes,
    ];

    weekRecipes.forEach((dayOfWeek, i) => {
      const date = currentWeek.startOf("week").add(i, "day");
      const recipesForDay = [];

      DayList.forEach((DayRecipe) => {
        const recipesForDay2 = DayRecipe.recipes.filter((recipe) => {
          return dayjs(DayRecipe.date).isSame(date);
        });
        recipesForDay.push(...recipesForDay2);
      });
      const uniqueRecipesForDay = Array.from(new Set(recipesForDay));
      weekRecipes[i] = uniqueRecipesForDay;
    });

    setSundayRecipes(weekRecipes[0]);
    setMondayRecipes(weekRecipes[1]);
    setTuesdayRecipes(weekRecipes[2]);
    setWednesdayRecipes(weekRecipes[3]);
    setThursdayRecipes(weekRecipes[4]);
    setFridayRecipes(weekRecipes[5]);
    setSaturdayRecipes(weekRecipes[6]);
  };

  const fetchDayListByUser = useCallback(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/Recipes/users/100/recipes/WithDate`)
        .then((response) => {
          setDayList(response.data);
        });
    }
  }, [userId]);

  useEffect(() => {
    fetchDayListByUser();
  }, [fetchDayListByUser]);

  useEffect(() => {
    //A Activer pour le test
    //TODO  A décommenter pour la prod

    //fetchDayListByUser();

    calculateRecipesForWeek();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DayList, currentWeek]);

  const handleRecipeClick = (cell, index) => {
    if (!cell.active) {
      console.log("La case est inactive");
      return;
    }

    const recipe = cell.recipes[index];
    console.log(
      `Clicked on recipe ${recipe.recipeId} ${recipe.title} on ${cell.date} ${cell.active}`
    );
    handleDetailModalShow(recipe);
  };

  const addRecipe = (cell) => {
    const eventKey = "recipes"; // L'onglet de la page de détail à afficher
    const searchParams = new URLSearchParams(); // Créer un nouvel objet URLSearchParams
    searchParams.append("tab", eventKey); // Ajouter l'onglet de la page de détail comme paramètre de requête
    searchParams.append("date", cell.date); // Ajouter la date comme paramètre de requête
    searchParams.append("userId", userId); // Ajouter le userID
    navigate("/mainFrame?" + searchParams.toString()); // Naviguer vers la page de détail avec les paramètres de requête
  };

  function prevWeek() {
    const newCurrentWeek = currentWeek.subtract(1, "week");
    setCurrentWeek(newCurrentWeek);
  }

  function nextWeek() {
    const newCurrentWeek = currentWeek.add(1, "week");
    setCurrentWeek(newCurrentWeek);
  }

  function renderDays() {
    const days = [];
    const startOfWeek = currentWeek.startOf("week");
    const weekRecipes = [
      sundayRecipes,
      mondayRecipes,
      tuesdayRecipes,
      wednesdayRecipes,
      thursdayRecipes,
      fridayRecipes,
      saturdayRecipes,
    ];

    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.add(i, "day");
      const recipes = weekRecipes[i];
      const cell = { date: date, recipes: recipes, active: recipes.length > 0 };
      days.push(
        <div key={date.toString()} className="week-calendar__day border mt-3">
          <div className="week-calendar__day-label text-start mx-3 recipe--title">
            {date.locale("fr").format("dddd").toLocaleUpperCase()}
            <span className="week-calendar__day-number ms-5">
              {date.format("D")}
            </span>
          </div>
          {cell.recipes.map((recipe, j) => (
            <div
              key={`${date.toString()}-${j}`}
              className="week-calendar__day-cell "
              onClick={() => handleRecipeClick(cell, j)}
            >
              <div>
                <CardRecipe
                  date={cell.date}
                  key={j}
                  recipeId={recipe.recipeId}
                  title={recipe.title}
                  pictureUrl={recipe.pictureUrl}
                  index={j}
                />
              </div>
            </div>
          ))}
          {/* Ajouter une case vide si aucune recette n'est planifiée */}
          {!cell.active && (
            <div className="week-calendar__day-cell col-10">
              <AddRecipeButton addRecipe={() => addRecipe(cell)} />
              <AddRecipeButton addRecipe={() => addRecipe(cell)} />
            </div>
          )}
          <AddRecipeButton addRecipe={() => addRecipe(cell)} />
        </div>
      );
    }
    return days;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="week-calendar">
          <div className="week-calendar__header">
            <button onClick={prevWeek} className="btn">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <button onClick={nextWeek} className="btn">
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </button>
            <div className="mx-3">
              <h2 className="">
                {currentWeek.locale("fr").format("D MMMM")} -{" "}
                {currentWeek.add(6, "day").locale("fr").format("D MMMM YYYY")}
              </h2>
            </div>
            <button className="btn">
              <span className="material-symbols-outlined ml-5">
                arrow_drop_down
              </span>
            </button>
          </div>
          <div className="week-calendar__body">{renderDays()}</div>
        </div>
      </div>

      <DetailModal
        selectedRecipe={selectedRecipe}
        detailModalShow={detailModalShow}
        handleDetailModalClose={handleDetailModalClose}
      />
    </>
  );
}

// export default WeekCalendar;
//eslint-disable-next-line
export default function (props) {
  const history = useNavigate();
  return <WeekCalendar {...props} history={history} />;
}
