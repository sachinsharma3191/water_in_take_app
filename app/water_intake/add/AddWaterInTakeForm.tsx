    "use client";

    import React, {useState} from "react";
    import Box from "@mui/material/Box";
    import InputLabel from "@mui/material/InputLabel";
    import MenuItem from "@mui/material/MenuItem";
    import FormControl from "@mui/material/FormControl";
    import FormHelperText from '@mui/material/FormHelperText';
    import Select, {SelectChangeEvent} from "@mui/material/Select";
    import {TextField} from "@mui/material";
    import _ from 'lodash';

    type WaterInTakeForm = {
        measuringUnits: string[];
    };

    export default function AddWaterInTakeForm(waterInTakeForm: WaterInTakeForm) {
        const [measuringUnit, setMeasuringUnit] = useState("");
        const [quantityOfMeasuringUnit, setQuantityOfMeasuringUnit] = useState(0);
        const [quantityOfWaterInTake, setQuantityOfWaterInTake] = useState(0);
        const [error, setError] = React.useState(false);
        const [helperText, setHelperText] = React.useState('');


        const handleMeasuringUnitChange = (event: SelectChangeEvent) => {
            setMeasuringUnit(event.target.value);
        };

        const handleQuantityOfMeasuringUnitChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const value = event.target.value;
            if (!_.isUndefined(value) || !_.isNull(value) || !_.isEmpty(value)) {
                if (!_.isNumber(value)) {
                    setHelperText(' ');
                    setError(true);
                } else {
                    setQuantityOfMeasuringUnit(parseInt(value));
                }
            }
        }

        const handleQuantityOfWaterInTakeChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const value = event.target.value;
            if (!_.isUndefined(value) || !_.isNull(value) || !_.isEmpty(value)) {
                if (!_.isNumber(value)) {
                    setHelperText(' ');
                    setError(true);
                } else {
                    setQuantityOfWaterInTake(parseInt(value));
                }
            }
        }

        return (
            <>
                {" "}
                <Box component="form" sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Measuring Unit</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={measuringUnit}
                            label="Age"
                            onChange={handleMeasuringUnitChange}
                        >
                            {
                                waterInTakeForm.measuringUnits.map(
                                    (measuringUnit, index) =>
                                        (
                                            <MenuItem key={index}>{measuringUnit}</MenuItem>
                                        )
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id="outlined-basic"
                                   label="Quantity of Measuring Unit"
                                   variant="outlined"
                                   onChange={handleQuantityOfMeasuringUnitChange}
                                   value={quantityOfMeasuringUnit}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id="outlined-basic"
                                   label="Quantity of Water In Take"
                                   variant="outlined"
                                   onChange={handleQuantityOfWaterInTakeChange}
                                   value={quantityOfWaterInTake}/>
                        {
                            error ? <FormHelperText>
                                    {helperText}
                                </FormHelperText>
                                : null
                        }
                    </FormControl>

                </Box>
            </>
        );
    }
