import React from "react";
import { questions } from "../questions";

const QuestionComponent = () => {
  const style = {
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    color: "white",
    fontFamily: "Lobster",
    fontSize: "2.85rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    height: "200px",
    marginTop: "1rem",
    padding: ".5rem 1rem",
    borderRadius: "4px",
  };

  return (
    <div style={style}>
      <pre style={{ fontFamily: "Lobster" }}>{questions[0].questionText}</pre>
    </div>
  );
};

export default QuestionComponent;
