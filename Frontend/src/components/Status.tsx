import React from "react";
import { Typography } from "@mui/material";

export const Status = ({
  numOfDone,
  length,
}: {
  numOfDone: number;
  length: number;
}) => (
  <div>
    <Typography color="text.primary">
      Done: {numOfDone} | Undone: {length - numOfDone}
    </Typography>
  </div>
);
