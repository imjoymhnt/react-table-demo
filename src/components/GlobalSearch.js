import React from "react";
import { useAsyncDebounce } from "react-table";

const GlobalSearch = ({
  globalFilter,
  setGlobalFilter,
  preGlobalFilteredRows,
}) => {
  const [value, setValue] = React.useState(globalFilter);
  const count = preGlobalFilteredRows.length;
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 500);
  return (
    <div>
      <label>Search: </label>
      <input
        placeholder={`${count} Search..`}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        value={value || ""}
      />
    </div>
  );
};

export default GlobalSearch;
