import moment from "moment";

const TableRow = ({ data, ...props }) => {
  console.log("data", data.name);
  return (
    <tr>
      <th>{data.name}</th>
      <th></th>
      <th>{moment(data.week).format("MM-DD-YYYY")}</th>
      <th>{data.hoursWorked}</th>
      <th>{data.weeklyPay}</th>
      <th>{data.taxes}</th>
      <th>{data.netPay}</th>
    </tr>
  );
};

export default TableRow;
