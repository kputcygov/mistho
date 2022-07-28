import React from "react";
import {SchedulersEntity} from "../App.types";
import {
    Box,
    Button,
    Collapse,
    FormControl,
    IconButton,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {Close as CloseIcon, Delete as DeleteIcon, ModeEdit as ModeEditIcon,} from "@mui/icons-material";

const ScraperRow = (props: {
    row: SchedulersEntity;
    isAddAction?: boolean;
    onAdd?: (scheduler: SchedulersEntity) => void;
    onUpdate?: (scheduler: SchedulersEntity) => void;
    onDelete?: (id: number) => void;
    onCancel?: () => void;
}) => {

    const {row} = props;
    let [open, setOpen] = React.useState(props.isAddAction);
    const [name, setName] = React.useState<string>(row.name);
    const [schedule, setSchedule] = React.useState<string>(row.expression);
    const [, setUrlError] = React.useState<string>("");

    const toggleOpen = () => {
        setOpen((open) => !open);
        if (!open) {
            setUrlError("");
        }
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchedule(e.target.value);
    };

    const urlValidate = () => {
        if (
            !/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?/gi.test(
                schedule
            )
        ) {
            setUrlError("Invalid URL");
        } else {
            setUrlError("");
        }
    };

    const onLocalCancel = (): void => {
        toggleOpen();
        if (props.onCancel) {
            props.onCancel();
        }
    };

    const onLocalDelete = (): void => {
        if (props.onDelete) {
            props.onDelete(row.id);
        }
    };

    const onLocalSave = (): void => {
        if (props.onUpdate) {
            props.onUpdate({
                id: row.id,
                name,
                expression: schedule,
                status: row.status,
                scraperId: row.scraperId,
            });
            toggleOpen();
        }
    };

    return (
        <>
            <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
                <TableCell align="left" component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.expression}</TableCell>
                <TableCell align="right">
                    {!props.isAddAction && (
                        <IconButton
                            aria-label="edit scraper"
                            size="medium"
                            onClick={toggleOpen}
                        >
                            {!open ? <ModeEditIcon/> : <CloseIcon/>}
                        </IconButton>
                    )}
                </TableCell>
                <TableCell align="right">
                    {!props.isAddAction && (
                        <IconButton
                            aria-label="delete scraper"
                            size="medium"
                            onClick={onLocalDelete}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout={0} unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                {props.isAddAction ? "Add scraper" : "Edit scraper"}
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    justifyContent: "space-between",
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TextField
                                        autoFocus
                                        required
                                        label="Name"
                                        defaultValue={row.name}
                                        onChange={onNameChange}
                                    />
                                    <TextField
                                        required
                                        label="Schedule"
                                        defaultValue={row.expression}
                                        onChange={onScheduleChange}
                                        onBlur={urlValidate}
                                    />
                                </Box>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button onClick={onLocalCancel}>Cancel</Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onLocalSave}
                                    >
                                        Save
                                    </Button>
                                </FormControl>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default React.memo(ScraperRow);
