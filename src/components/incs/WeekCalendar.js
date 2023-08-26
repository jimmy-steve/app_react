import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // Import the French locale for dayjs

dayjs.locale("fr"); // Set thlocale to Frenche

const handleAddRecipe = (date) => {
  console.log("Add recipe for", date.format("YYYY-MM-DD"));
  // You can perform actions here based on the clicked date
};

function creerTableauSemaine(date) {
  const selectedDay = dayjs(date).startOf("week");
  const daysInWeek = [];

  for (let i = -1; i < 6; i++) {
    daysInWeek.push(selectedDay.add(i, "day"));
  }

  return daysInWeek;
}

const WeekCalendar = ({ date }) => {
  const week = creerTableauSemaine(date);

  return (
    <div className="row">
      <div className="col">
        <table className="table">
          <thead>
            <tr>
              {week.map((jour) => (
                <th key={jour.format("YYYY-MM-DD")} className="text-center">
                  <div>
                    <div className="capitalize-title">
                      {jour.format("dddd")}
                    </div>
                    <div>{jour.format("D MMM")}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {week.map((jour) => (
                <td key={jour.format("YYYY-MM-DD")}>
                  <div className="day-card">
                    <div className="card recipe-card ms-1 me-1 mb-3">
                      <div className="card-body text-center">
                        <button
                          type="button"
                          onClick={() => handleAddRecipe(jour)}
                          className="btn btn-outline-primary"
                        >
                          <i class="fa-solid fa-plus"></i> Add
                        </button>
                      </div>
                    </div>
                    <div className="card recipe-card ms-1 me-1 mb-3">
                      <div className="card-body text-center">
                        <button
                          type="button"
                          onClick={() => handleAddRecipe(jour)}
                          className="btn btn-outline-primary"
                        >
                          <i class="fa-solid fa-plus"></i> Add
                        </button>
                      </div>
                    </div>
                    <div className="card recipe-card ms-1 me-1 mb-3">
                      <div className="card-body text-center">
                        <button
                          type="button"
                          onClick={() => handleAddRecipe(jour)}
                          className="btn btn-outline-primary"
                        >
                          <i class="fa-solid fa-plus"></i> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeekCalendar;
