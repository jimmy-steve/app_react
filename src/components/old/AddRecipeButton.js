import React from "react";
import Card from "react-bootstrap/Card";

function AddRecipeButton(props) {

  return (
    <>
      <Card
        className="border text-center mx-auto m-2 col-md-4 col-lg-12"
      >
        <button
          className="btn empty-card-btn mt-5 mb-5 bg-light"
          onClick={props.addRecipe}
        >
          + Ajouter une recette
        </button>
      </Card>
    </>
  );
}
export default AddRecipeButton;
