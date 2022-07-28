import React, {useEffect, useState} from "react";
import {GenericApiService} from "../api/api";
import {SchedulersEntity} from "../App.types";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import {OneRemMarginWrapper} from "../App.styled";
import {Button} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {notExistingID} from "../App";
import SchedulerRow from "./SchedulerRow";

export const RunManager = () => {
    const schedulersService = new GenericApiService("schedulers");

    const [schedulers, setSchedulers] = useState<SchedulersEntity[]>([]);

    useEffect(() => {
        schedulersService.getAll().then((schedulers) => setSchedulers(schedulers));
    }, []);

    const onAdd = () => {
    };

    const onDelete = () => {
    };

    const onCancel = () => {
    };

    const onUpdate = (scheduler: SchedulersEntity) => {
        schedulersService
            .update(scheduler.id.toString(), scheduler)
            .then((newScheduler) => {
                setSchedulers(
                    schedulers.map((scheduler) =>
                        scheduler.id === newScheduler.id ? newScheduler : scheduler
                    )
                );
            });
    };

    const addScraper = () => {
    };

    return (
        <Paper sx={{width: "70%", margin: "auto"}} elevation={3}>
            <TableContainer sx={{maxHeight: 640}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Schedule</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedulers.map((scheduler) => {
                            if (scheduler.id === notExistingID) {
                                return (
                                    <SchedulerRow
                                        key={scheduler.id}
                                        row={scheduler}
                                        isAddAction={true}
                                        onAdd={onAdd}
                                        onDelete={onDelete}
                                        onCancel={onCancel}
                                    />
                                );
                            }
                            return (
                                <SchedulerRow
                                    key={scheduler.id}
                                    row={scheduler}
                                    isAddAction={false}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                    onCancel={onCancel}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <OneRemMarginWrapper>
                    <Button
                        disabled
                        variant="contained"
                        color="primary"
                        onClick={addScraper}
                    >
                        Add scheduler (not implemented)
                    </Button>
                </OneRemMarginWrapper>
            </Box>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={schedulers.length}
                rowsPerPage={25}
                page={0}
                onPageChange={() => {
                }}
                onRowsPerPageChange={() => {
                }}
            />
        </Paper>
    );
};
