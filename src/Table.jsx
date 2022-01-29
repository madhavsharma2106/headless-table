import { useTable } from "./useTable";
import { getQueryParams, ICONS } from "./utils";

export const Table = ({ columns, data }) => {
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
    if (!sortBy) return;
    if (sortBy !== header.accessor) return null;
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
