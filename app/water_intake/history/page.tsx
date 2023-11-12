import * as React from 'react';
import {fetchWaterIntakeHistory} from "@/app/lib/data";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
    {field: 'measuring_unit', headerName: 'Measuring Unit', width: 150},
    {field: 'quantity_of_water_intake', headerName: 'Quantity of Water Intake', width: 150},
    {field: 'quantity_of_measuring_unit', headerName: 'Quantity of Measuring Unit', width: 150},
    {field: 'total_water_in_take', headerName: 'Total Water In Take', width: 150},
    {field: 'added_for', headerName: 'Added Data', width: 150},
];

export default async function Page() {
    const rows = await fetchWaterIntakeHistory('');
    return <div style={{ height: 300, width: '100%' }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Measuring Unit</TableCell>
                        <TableCell align="right">Quantity of Measuring Unit</TableCell>
                        <TableCell align="right">Quantity of Water Intake</TableCell>
                        <TableCell align="right">Total Water In Take</TableCell>
                        <TableCell align="right">Added on</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.measuring_unit}
                            </TableCell>
                            <TableCell align="right">{row.quantity_of_measuring_unit}</TableCell>
                            <TableCell align="right">{row.quantity_of_water_intake}</TableCell>
                            <TableCell align="right">{row.total_water_in_take}</TableCell>
                            <TableCell align="right">{row.added_for}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

