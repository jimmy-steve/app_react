import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import React from "react";
import dayjs from "dayjs";
import WeekCalendar from "../incs/WeekCalendar";
import "dayjs/locale/fr"; // Import the French locale for dayjs

const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const handlePrevWeek = () => {
    setSelectedDate(selectedDate.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.add(1, "week"));
  };

  return (
    <>
      <div className="container-fluid position-relative p-0">
        <NavBarBootstrap pageTitle="Meal Planner" />
        <SideBar />
        <div className="content">
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-md-4 mt-2 mb-2">
                <button
                  className="btn btn-sm btn-outline-primary btn-lg-square"
                  onClick={handlePrevWeek}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-primary btn-lg-square"
                  onClick={handleNextWeek}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <WeekCalendar date={selectedDate} />
            </div>
          </div>
        </div>
        <button className="btn btn-lg btn-lg-square back-to-top">
          <i className="bi bi-arrow-up"></i>
        </button>
      </div>
    </>
  );
};

export default MealPlanner;
