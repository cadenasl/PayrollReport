import { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "../components/TableRow";
import NavBar from "../components/navBar";
const PayrollInterface = () => {
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);
  //generates report sorted by work week
  const generateOverallReport = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/timecard/generate-weekly-report"
      );

      setReport(data.report);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    generateOverallReport();
  }, []);
  console.log(report);

  return (
    <>
      <NavBar />
      <div className="container-fluid text-center">
        <h1>Payroll Report</h1>
        {report.length?<h3>Click on employee row to modify time Card</h3>:null}
        <div className="table-responsive">
          <table id="customers">
            <tbody>
              <tr>
                <th>Employee Name</th>
                <th>Current or Past Employee</th>
                <th>Time Card Week</th>
                <th>Hours worked for week</th>
                <th>weekly pay</th>
                <th>taxes</th>
                <th>net pay</th>
              </tr>
              {report.length?
                report.map((data) => {
                  return <TableRow data={data} />;
                }):null}
            </tbody>
          </table>
          {!report.length && <div>Please add an employee name and time card to populate data here</div>}
        </div>
      </div>
    </>
  );
};

export default PayrollInterface;
