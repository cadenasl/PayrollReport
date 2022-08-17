import NavBar from "../components/navBar";

const AddEmployee = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid text-center addEmployeeFormContainer mt-2">
        <form>
          <div class="form-group">
            <label for="formGroupExampleInput">Name</label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Example input"
            />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">
              Is this a current Employee
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Another input"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
