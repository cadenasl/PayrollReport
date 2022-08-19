import NavBar from "../components/navBar";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DateCalender from "../components/Datepicker";
import moment from "moment";
import axios from "axios";
const ModifyTimeCard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, onSuccess] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { timeStamp: new Date() } });
  console.log(params.employee);
  const [timeCard, setTimeCard] = useState();
  const [startDate, setStartDate] = useState();
  //obtains specfic time card by id stored in params
  const getSpecificTimeCard = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4001/timecard/get-specific-timecard",
        { _id: params.employee }
      );
      setTimeCard(data.timeCard);
    } catch (error) {
      console.error(error);
    }
  };
  const submitModifiedTimeCard = async (submissiondata) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4001/timecard/modify-timecard",
        { submissiondata }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSpecificTimeCard();
  }, []);
  console.log("timecard", timeCard);

  const onSubmit = (data) => {
    const submission = { _id: timeCard._id, ...data };
    submitModifiedTimeCard(submission);
  };
  console.log(errors);
  useEffect(() => {
    if (timeCard && timeCard.name) {
      reset({
        name: timeCard.name,
        week: timeCard.week,
        hoursWorked: timeCard.hoursWorked,
        weeklyPay: timeCard.weeklyPay,
        taxes: timeCard.taxes,
        netPay: timeCard.netPay,
      });
    }
  }, [timeCard]);

  return (
    <>
      <NavBar />
      <h2>Modify Time Card For Employee</h2>
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
                Work Week:{" "}
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
                      setStartDate(date);
                      field.onChange(date);
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
                placeholder="Hours Worked"
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
                placeholder="Weekly Pay"
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

export default ModifyTimeCard;
