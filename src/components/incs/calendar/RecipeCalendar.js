import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

dayjs.locale("fr");

function creerTableauSemaine(date) {
    const selectedDay = dayjs(date).startOf("week");
    const daysInWeek = [];

    for (let i = 0; i < 7; i++) {
        daysInWeek.push(selectedDay.add(i, "day"));
    }

    return daysInWeek;
}

const RecipeCalendar = ({date}) => {
    const week = creerTableauSemaine(date);
    const chunkSize = 5; // Set the number of days per screen

    const chunkedWeek = [];
    for (let i = 0; i < week.length; i += chunkSize) {
        chunkedWeek.push(week.slice(i, i + chunkSize));
    }

    return (
        <div className="row">
            <div className="col">
                <h2 className="text-center">
                    Semaine du {week[0].format("D MMMM")} au {week[week.length - 1].format("D MMMM")}
                </h2>
                <Carousel
                    showThumbs={false}
                    swipeable
                    emulateTouch
                    dynamicHeight
                    showArrows={chunkedWeek.length > 1} // Show arrows if there are multiple screens
                >
                    {chunkedWeek.map((chunk, index) => (
                        <div key={index} className="row">
                            {chunk.map((jour) => (
                                <div key={jour.format("YYYY-MM-DD")} className="col">
                                    <div className="day-card d-flex flex-column align-items-center">
                                        <div className="col-md-12">
                                            <div className="card recipe-card mb-3 ">
                                                <img
                                                    src="../../img/lasagne.jpg"
                                                    className="card-img-top rounded img__recipe img-fluid"
                                                    alt=""
                                                />
                                                <div
                                                    className="card-body  top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-transparent"
                                                    >
                                                        Titre
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default RecipeCalendar;
