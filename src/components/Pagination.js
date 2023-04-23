import React from "react";

const Pagination = ({
  pageOptions,
  page,
  pageIndex,
  pageSize,
  gotoPage,
  prevPage,
  nextPage,
  setPageSize,
  canPrevPage,
  canNextPage,
}) => {
  console.log(pageSize);
  return (
    <div>
      {" "}
      <div>
        <button onClick={() => prevPage()} disabled={!canPrevPage}>
          Previous Page
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next Page
        </button>
        <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
        <div>Go to page:</div>
        <input
          type="number"
          defaultValue={pageIndex + 1 || 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {pageOptions.map((option) => (
            <option key={option} value={option}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
