import React from "react";
import { useAsyncDebounce } from "react-table";
import PropTypes from "prop-types";

const ColumnFilter = ({ column, placeholder }) => {
  const { filterValue, setFilter } = column;
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      Search: {""}
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value);
          onChange(e.target.value);
        }}
      ></input>
    </span>
  );
};

ColumnFilter.propTypes = {
  filter: PropTypes.shape({
    filter: PropTypes.string,
  }),
  setFilter: PropTypes.objectOf(
    PropTypes.shape({
      setFilter: PropTypes.string,
    })
  ),
  placeholder: PropTypes.shape({
    placeholder: PropTypes.string,
  }),
  column: PropTypes.shape({
    column: PropTypes.string,
    filterValue: PropTypes.string,
    setFilter: PropTypes.string,
  }),
};

export default ColumnFilter;
