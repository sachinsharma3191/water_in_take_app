"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type WaterInTakeForm = {
  measuringUnits: string[];
};

export default function AddWaterInTakeForm(waterInTakeForm: WaterInTakeForm) {
  const [measuringUnit, setMeasuringUnit] = useState("");

  const handleMeasuringUnitChange = (event: SelectChangeEvent) => {
    setMeasuringUnit(event.target.value);
  };

  return (
    <>
      {" "}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Measuring Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={measuringUnit}
            label="Age"
            onChange={handleMeasuringUnitChange}
          >
            {waterInTakeForm.measuringUnits.map((measuringUnit, index) => (
              <MenuItem key={index}>{measuringUnit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
