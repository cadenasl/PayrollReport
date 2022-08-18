import logo from "./logo.svg";
import "./App.css";
import PayrollInterface from "./pages/PayrollInterface";
import AddEmployee from "./pages/AddEmployee";
import ModifyEmployee from "./pages/ModifyEmployee";
import AddTimeCard from "./pages/AddTimeCard";
import ModifyTimeCard from "./pages/ModifyTimeCard";
import DeleteEmployee from "./pages/DeleteEmployee";
import { Route, Routes } from "react-router-dom";
//add params to put timecard id
function App() {
  return (
    <div className="container-fluid text-center">
      <Routes>
        <Route path="/" element={<PayrollInterface />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/modify-employee" element={<ModifyEmployee />} />
        <Route path="/add-timecard" element={<AddTimeCard />} />
        <Route path="/delete-timecard" element={<DeleteEmployee />} />

        <Route path="/modify-timecard/:employee" element={<ModifyTimeCard />} />
      </Routes>
    </div>
  );
}

export default App;
