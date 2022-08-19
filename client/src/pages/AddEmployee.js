import NavBar from "../components/navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState,useEffect } from "react";

const AddEmployee = () => {
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  //submits new employee information
  const submitAddEmployee = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/employee/add-employee",
        { data }
      );
      navigate("/add-timecard");
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    submitAddEmployee(data);
  };

  

  console.log(error);
  return (
    <>
      <NavBar />
      <h2>Add an Employee</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="container-fluid text-center addEmployeeFormContainer mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
           
            <div class="form-group">
              <label for="isCurrent">Is this a current Employee</label>

              <input
                name="isCurrent"
                type="checkbox"
                {...register("isCurrent")}
                id="isCurrent"
                className="ml-2"
              />

              {errors.isCurrent && (
                <span className="text-danger py-2">
                  {errors.isCurrent.message}
                </span>
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

export default AddEmployee;
