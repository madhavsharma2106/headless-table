import { useTable } from "../../hooks/useTable";
import { getQueryParams, ICONS } from "../../utils";

export const Table = ({ columns, resource }) => {
  const { data } = resource.read();
  const { headers, rows } = useTable({ columns, data });

  const renderRows = () => {
    const _renderCells = (row) => {
      return row.cells.map((cell) => {
        return <td {...cell.getCellProps()}>{cell.value}</td>;
      });
    };

    return rows.map((row) => {
      return <tr {...row.getRowProps()}>{_renderCells(row)}</tr>;
    });
  };

  const renderSortingIcon = (header) => {
    const sortBy = getQueryParams("sortBy");
    if (!sortBy || sortBy !== header.accessor) return;

    return ICONS[getQueryParams("order")];
  };

  const renderHeaders = () => {
    return (
      <tr>
        {headers.map((header) => {
          return (
            <th {...header.getHeaderProps()}>
              {header.header}
              {renderSortingIcon(header)}
              {header.searchable && header.getSearchBar()}
            </th>
          );
        })}
      </tr>
    );
  };

  return (
    <>
      <table>
        <thead> {renderHeaders()}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </>
  );
};