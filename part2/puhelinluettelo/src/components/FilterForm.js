import React from "react";

const FilterForm = (props) => {
  return (
    <div>
      find countries: <input value={props.filterValue} onChange={props.handleFilterChange} />
    </div>
  );
};

export default FilterForm;
