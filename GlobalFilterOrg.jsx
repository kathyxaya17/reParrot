import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import PropTypes from "prop-types";

const GlobalFilterOrg = ({ filter, setFilter, placeholder }) => {
  const [value, setValue] = useState(filter);
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
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      ></input>
    </span>
  );
};

GlobalFilterOrg.propTypes = {
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
};

export default GlobalFilterOrg;
