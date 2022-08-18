import NavBar from "../components/navBar";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DateCalender from "../components/Datepicker";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddTimeCard = () => {
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { timeStamp: new Date() } });
  const submitModifiedTimeCard = async (submissiondata) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4001/timecard/create-timecard",
        { submissiondata }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const onSubmit = (data) => {
    submitModifiedTimeCard(data);
  };
  console.log(errors);
  console.log("start date", startDate);
  return (
    <>
      <NavBar />
      <h2>Add Time Card For Employee</h2>
      <div className="container-fluid text-center addEmployeeFormContainer mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div class="form-group">
              <label for="Name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Name"
                {...register("name", { required: "name is required" })}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="url" className="input-label">
                Work Week{" "}
                {startDate &&
                  `from ${moment(startDate).format("MM-DD-YYYY")} to ${moment(
                    startDate
                  )
                    .add(6, "days")
                    .format("MM-DD-YYYY")} `}
              </label>
              <Controller
                control={control}
                name="week"
                render={({ field }) => (
                  <DateCalender
                    placeholderText="Select date"
                    setDate={(date) => {
                      field.onChange(date);
                      setStartDate(date);
                    }}
                    date={field.value}
                  />
                )}
              />
            </div>
            <div class="form-group">
              <label for="Name">Hours Worked for week</label>
              <input
                type="number"
                class="form-control"
                id="hoursWorked"
                placeholder="hoursWorked"
                {...register("hoursWorked", {
                  valueAsNumber: true,
                  required: "Hours is required",
                })}
              />
              {errors.hoursWorked && (
                <span className="text-danger">
                  {errors.hoursWorked.message}
                </span>
              )}
            </div>
            <div class="form-group">
              <label for="Name">Weekly pay</label>
              <input
                type="number"
                class="form-control"
                id="weeklyPay"
                placeholder="weeklyPay"
                {...register("weeklyPay", {
                  valueAsNumber: true,
                  required: "weekly pay is required",
                })}
              />
              {errors.weeklyPay && (
                <span className="text-danger">{errors.weeklyPay.message}</span>
              )}
            </div>
            <div class="form-group">
              <label for="taxes">Taxes</label>
              <input
                type="number"
                class="form-control"
                id="taxes"
                placeholder="taxes"
                {...register("taxes", {
                  valueAsNumber: true,
                  required: "weekly taxes is required",
                })}
              />
              {errors.taxes && (
                <span className="text-danger">{errors.taxes.message}</span>
              )}
            </div>
            <div class="form-group">
              <label for="number">Net Pay</label>
              <input
                type="number"
                class="form-control"
                id="netPay"
                placeholder="netPay"
                {...register("netPay", {
                  valueAsNumber: true,
                  required: "weekly taxes is required",
                })}
              />
              {errors.netPay && (
                <span className="text-danger">{errors.netPay.message}</span>
              )}
            </div>
          </div>
          <button className="btn btn-primary mx-2 my-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTimeCard;
