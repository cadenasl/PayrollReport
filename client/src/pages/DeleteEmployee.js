import NavBar from "../components/navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState,useEffect } from "react";

const DeleteEmployee = () => {
  const [error, setError] = useState(false);
  const [employees,setEmployees]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const getEmployee = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.get(
        "http://localhost:4001/employee/",
        
      );

      setEmployees(data.employeeNames)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };
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
      <h2>Delete an Employee</h2>
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
