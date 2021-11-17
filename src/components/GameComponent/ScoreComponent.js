import React from "react";

const ScoreComponent = () => {
  const divStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "fit-content",
    fontFamily: "Lobster",
  };

  return (
    <div style={divStyles}>
      <h2
        style={{
          color: "#3EDA73",
          fontWeight: "400",
        }}
      >
        Score
      </h2>
      <p
        style={{
          color: "#fff",
          fontSize: "1.5rem",
        }}
      >
        0
      </p>
    </div>
  );
};

export default ScoreComponent;