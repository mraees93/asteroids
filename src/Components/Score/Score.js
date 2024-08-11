import React from "react";
import { useSelector } from "react-redux";

export default function Score() {
  const score = useSelector((state) => state.score);

  return (
    <h5 data-testid="scoreID" className="m-1">
      Score: {score}
    </h5>
  );
}
