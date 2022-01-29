import "./App.css";
import { tableData } from "./mockdata";
import { Table } from "./Table";

const currentYear = new Date().getFullYear();

function _calculateAge(birthday) {
  const year = birthday.split("-")[0];
  return Math.abs(year - currentYear);
}

const columns = [
  {
    header: "Name",
    accessor: "name",
    searchable: true,
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Age",
    accessor: "birth_date",
    transformer: _calculateAge,
  },
  {
    header: "Years of experience",
    accessor: "year_of_experience",
    sortable: true,
  },
  {
    header: "Position Applied",
    accessor: "position_applied",
    searchable: true,
    sortable: true,
  },
  {
    header: "Applied",
    accessor: "application_date",
    sortable: true,
  },
  {
    header: "Status",
    accessor: "status",
    searchable: true,
  },
];

function App() {
  // const data = tableData.slice(0, 5);
  return (
    <div>
      <Table data={tableData} columns={columns} />
    </div>
  );
}

export default App;
