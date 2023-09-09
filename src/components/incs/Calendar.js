import * as React from "react";
import dayjs from "dayjs";

const weekdays = "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split(
    "_"
);

function range(start, end) {
    const s = end != null ? start : 0;
    const e = end != null ? end : start;
    const dicrection = s < e ? 1 : -1;
    const length = Math.abs(e - s);
    const result = Array(length);

    for (let i = 0; i < length; i += 1) {
        result[i] = s + i * dicrection;
    }

    return result;
}

function sliceByNumber(array, number) {
    const length = Math.ceil(array.length / number);
    return new Array(length)
        .fill(null)
        .map((_, i) => array.slice(i * number, (i + 1) * number));
}

function createCalendarArray(lastDays, now) {
    const today = dayjs(now);
    const end = today.endOf("month");
    const endDays = end.date();
    const month = range(endDays).map((i) => i + 1);

    const total = [
        ...range(lastDays).fill(0),
        ...month,
        ...range(Math.ceil(month.length / 7)).fill(0),
    ];

    return sliceByNumber(total, 7);
}

const Calendar = ({now}) => {
    const today = dayjs(now);
    const start = today.startOf("month");
    const startWeekday = start.day();

    const calendar = createCalendarArray(startWeekday, now);

    return (
        <table>
            <thead>
            <tr>
                {weekdays.map((weekday) => (
                    <th key={weekday}>{weekday}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {calendar.map((week) => (
                <tr key={week.join("_")}>
                    {week.map((day, index) => {
                        if (day === 0) {
                            return <td key={index}/>;
                        }

                        return <td key={index}>{day}</td>;
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Calendar;
