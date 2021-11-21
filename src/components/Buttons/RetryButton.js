import React from "react";
import { FaSyncAlt } from "react-icons/fa";

const RetryButton = () => {
  return (
    <div className='button'>
      <FaSyncAlt
        style={{ color: "3EDA73", fontSize: "74px", cursor: "pointer" }}
      />
    </div>
  );
};

export default RetryButton;
