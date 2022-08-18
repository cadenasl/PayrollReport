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
