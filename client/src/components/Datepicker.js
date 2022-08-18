import "flatpickr/dist/themes/light.css";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";

const DateCalender = ({ setDate, date }) => {
  return (
    <Flatpickr
      value={date}
      options={{
        // altInputClass: 'flatpickr-custom-form-control form-control',
        dateFormat: "n/j/y",
        wrap: true,
        disable: [
          function (date) {
            return (
              date.getDay() === 1 ||
              date.getDay() === 2 ||
              date.getDay() === 3 ||
              date.getDay() === 4 ||
              date.getDay() === 5 ||
              date.getDay() === 6
            );
          },
        ],
      }}
      // className="flatpickr-custom flatpickr-custom-borderless"
      onChange={([date]) => {
        console.log(`date change`, date);
        setDate(date);
      }}
    >
      <input
        type="text"
        className="flatpickr-custom-form-control form-control"
        placeholder="Select date"
        data-input
        defaultValue="29/06/2022"
      />
    </Flatpickr>
  );
};

export default DateCalender;
