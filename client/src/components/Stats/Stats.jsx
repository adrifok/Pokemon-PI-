import React from "react";

const Stats = ({ value, name }) => {
  return (
    <>
      <div>
        <meter
          min="0"
          max="120"
          value={value}
          low="25"
          high="100"
          optimum="120"
        />
        <p>
          {name} --------<span>{value}</span>
        </p>
      </div>
    </>
  );
};

export default Stats;
