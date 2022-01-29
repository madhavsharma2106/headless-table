import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getQueryParams, searchArr, sortArr, sortingOrder } from "./utils";

export const useTable = ({ data, columns }) => {
  const _prepareHeaders = (columns) => {
    columns.forEach((column) => {
      const { accessor, sortable, searchable, header } = column;
      column.getHeaderProps = () => {
        const props = {
          style: {},
        };

        props.key = accessor;

        if (sortable) {
          props.onClick = () => {
            _updateQueryParams({
              sortBy: accessor,
              order: sortingOrder(getQueryParams("order")),
            });
          };

          props.style = {
            ...props.style,
            cursor: "pointer",
            color: "red",
          };
        }
        return props;
      };

      if (searchable) {
        column.getSearchBar = () => {
          const filter = getQueryParams("filter");
          const filterBy = getQueryParams("filterBy");

          const onChange = (e) => {
            _updateQueryParams({ filter: e.target.value, filterBy: accessor });
          };
          const value = filterBy === accessor ? filter : "";

          return (
            <input
              type="search"
              placeholder={header}
              onChange={onChange}
              value={value}
              onClick={(e) => e.stopPropagation()}
            />
          );
        };
      }
    });

    return columns;
  };

  const _prepareRows = (data, headers) => {
    const rows = [];

    // loop through all the rows
    const _loopThroughEachRow = (row, rowIndex) => {
      const preparedRow = {};
      const cells = [];

      // Looping through each cell.
      headers.forEach((header, cellIndex) => {
        const { accessor: accessorName, transformer } = header;
        const value = row[accessorName] || null;
        const cell = {};
        cell.value =
          transformer && value ? transformer(row[accessorName]) : value;

        cell.getCellProps = () => {
          return {
            key: `${accessorName}_${rowIndex}_${cellIndex}`,
          };
        };
        return cells.push(cell);
      });

      preparedRow.getRowProps = () => {
        return {
          key: row.id || `${rowIndex}`,
        };
      };
      preparedRow.cells = cells;
      preparedRow.original = { ...row };
      rows.push(preparedRow);
    };

    // Loop through each row
    data.forEach(_loopThroughEachRow);
    return rows;
  };

  const _sortColumn = () => {
    const sortBy = getQueryParams("sortBy");
    const order = getQueryParams("order");
    if (!sortBy) return;
    const sortedData = sortArr(data, sortBy, order);
    setRows(_prepareRows(sortedData, headers));
  };

  const _filterRows = () => {
    const query = getQueryParams("filter");
    const accessor = getQueryParams("filterBy");
    if (!accessor || !query) return;

    const filteredData = searchArr(data, accessor, query);
    setRows(_prepareRows(filteredData, headers));
  };

  const _updateQueryParams = (queryParams) => {
    let pathname = location.pathname;
    let searchParams = new URLSearchParams(location.search);
    for (let name in queryParams) {
      searchParams.set(name, queryParams[name]);
    }
    history.replace({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  const [headers, setHeaders] = useState(_prepareHeaders(columns));
  const [rows, setRows] = useState(_prepareRows(data, headers));
  const history = useHistory();
  const location = useLocation();

  console.log({ headers, rows });
  useEffect(() => {
    _sortColumn();
    _filterRows();
  }, [location]);
  return { headers, rows };
};
