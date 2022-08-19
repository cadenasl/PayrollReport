import NavBar from "../components/navBar";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DateCalender from "../components/Datepicker";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddTimeCard = () => {
  const [isLoading,setIsLoading]=useState(false)
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState();
  const [employees,setEmployees]=useState([])

  //fetches employee names for employee dropdown
  const getEmployee = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.get(
        "http://localhost:4001/employee/",
        
      );

      setEmployees(data.employeeNames)
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }
  };
  console.log("employees",employees)
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { timeStamp: new Date() } });
  //submits employee time card information 
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
  useEffect(()=>{
    getEmployee()
    
    
    
    
    },[])

    if(isLoading){
      return <>
      <NavBar />
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div></>
    }
  return (
    <>
      <NavBar />
      <h2>Add Time Card For Employee</h2>
      <div className="container-fluid text-center addEmployeeFormContainer mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
          <div class="form-group">
              <label for="name">Name</label>

              <select className="form-control" {...register("name")}>
              {employees&&employees.length&&employees.map((obj)=>{return <option value={obj}>{obj}</option>})}
                
              </select>
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
