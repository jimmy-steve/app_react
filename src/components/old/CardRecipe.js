import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import dayjs from "dayjs";
import axios from "axios";

const handleDeleteClick = async (event, date) => {
  event.stopPropagation();
  console.log("handleDeleteClick");

  const dateString = dayjs(date).format("YYYY-MM-DD");
  try {
    const response = await axios.get(
      `http://localhost:8000/byDate/${dateString}`
    );
    const recipes = response.data;
    recipes.forEach((recipe) => {
      recipe.days.forEach((day) => {
        console.log("day.dayId", day.id);
        try {
          const dayId = day.id;
          const deleteResponse = axios.delete(
            `http://localhost:8000/api/Days/${dayId}`
          );
          console.log(deleteResponse.data);
        } catch (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }

  alert("ëtes vous sur de vouloir supprimer cette recette ?");
};

function CardRecipe({ title, pictureUrl, recipeId, onAddRecipe, date }) {
  return (
    <div className="card recipe-card mt-2">
      <div className="card-body">
        <button
          className="btn btn-outline-dark btn-sm position-absolute top-0 end-0 m-2"
          onClick={(event) => handleDeleteClick(event, date)}
        >
          <span class="material-symbols-outlined">close</span>
        </button>
        <img src={pictureUrl} alt={pictureUrl} className="card--img" />
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}
export default CardRecipe;
