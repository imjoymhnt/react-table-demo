import React from "react";
import getData from "../utils/getData";
import getColumns from "../utils/columns";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalSearch from "./GlobalSearch";
import { matchSorter } from "match-sorter";
import Pagination from "./Pagination";
import "./tableStyle.css";

const Table = () => {
  const [products, setProducts] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  React.useMemo(async () => {
    const data = await getData();
    const updated = data.map((el) => {
      return { ...el, images: el.images[0] };
    });
    setProducts(updated);
    const columnData = getColumns(data[0]);
    setColumns(columnData);
  }, []);

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  fuzzyTextFilterFn.autoRemove = (val) => !val;

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,

      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { globalFilter, pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data: products, filterTypes },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <>
      <GlobalSearch
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
      />
      <table id="customers" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "⬇️" : "⬆️") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        pageOptions={pageOptions}
        page={page}
        pageIndex={pageIndex}
        pageSize={pageSize}
        gotoPage={gotoPage}
        prevPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
        canPrevPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </>
  );
};

export default Table;
