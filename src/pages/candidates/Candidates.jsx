import { tableData } from "../../utils/mockdata";
import { ErrorBoundary, Table } from "../../shared-components";
import { _calculateAge } from "../../utils";
import { Suspense } from "react";
import { CandidateService } from "../../services/candidates";

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

export const Candidates = () => {
  //   const data = tableData.slice(0, 5);
  const resource = CandidateService.getAllCandidates();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading ...</div>}>
        <Table resource={resource} columns={columns} />
      </Suspense>
    </ErrorBoundary>
  );
};
