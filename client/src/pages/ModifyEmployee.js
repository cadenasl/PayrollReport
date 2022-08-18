import NavBar from "../components/navBar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ModifyEmployee = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submitModifyEmployee = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/employee/modify-employee",
        { data }
      );
      navigate("/");
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  console.log("error", error);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.debug(data);
    submitModifyEmployee(data);
  };
  console.log(errors);
  return (
    <>
      <NavBar />
      <h2>Modify an Employee</h2>
      <div className="container-fluid text-center addEmployeeFormContainer mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div class="form-group">
              <label for="Name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.Name && (
                <span className="text-danger">{errors.Name.message}</span>
              )}
            </div>
            <div class="form-group">
              <label for="TypeEmployee">Is this a current Employee</label>

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

export default ModifyEmployee;
