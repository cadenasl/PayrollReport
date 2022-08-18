import NavBar from "../components/navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

const DeleteEmployee = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const submitAddEmployee = async (data) => {
    try {
      const response = await axios.delete(
        "http://localhost:4001/employee/delete-employee",
        { data }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    submitAddEmployee(data);
  };
  console.log(errors);
  return (
    <>
      <NavBar />
      <h2>Delete an Employee</h2>
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
          </div>
          <button className="btn btn-primary mx-2 my-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default DeleteEmployee;
