import NavBar from "../components/navBar";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

const ModifyEmployee = () => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.debug(data);
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
                id="Name"
                placeholder="Name"
                {...register("Name", { required: "Name is required" })}
              />
              {errors.Name && (
                <span className="text-danger">{errors.Name.message}</span>
              )}
            </div>
            <div class="form-group">
              <label for="TypeEmployee">Is this a current Employee</label>

              <input
                name="TypeEmployee"
                type="checkbox"
                {...register("TypeEmployee")}
                id="TypeEmployee"
                className="ml-2"
              />

              {errors.TypeEmployee && (
                <span className="text-danger py-2">
                  {errors.TypeEmployee.message}
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
