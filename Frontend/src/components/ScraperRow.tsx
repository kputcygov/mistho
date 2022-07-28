import React from "react";
import {ScrapersEntity} from "../App.types";
import {
  Box,
  Button,
  Chip,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  AddCircle as AddCircleIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  ModeEdit as ModeEditIcon,
} from "@mui/icons-material";

const ScraperRow = (props: {
    row: ScrapersEntity;
    isAddAction?: boolean;
    onAdd?: (scraper: ScrapersEntity) => void;
    onUpdate?: (scraper: ScrapersEntity) => void;
    onDelete?: (id: number) => void;
    onCancel?: () => void;
}) => {
    const {row} = props;
    let [open, setOpen] = React.useState(props.isAddAction);
    const [name, setName] = React.useState<string>(row.name);
    const [url, setURL] = React.useState<string>(row.url);
    const [selectors, setSelectors] = React.useState<string[]>(row.selectors);
    const [type, setType] = React.useState<string>(row.type);
    const [newSelector, setNewSelector] = React.useState<string>("");
    const [urlError, setUrlError] = React.useState<string>("");

    const toggleOpen = () => {
        setOpen((open) => !open);
        if (!open) {
            setUrlError("");
        }
    };

    const onTypeChange = (e: SelectChangeEvent) => {
        setType(e.target.value);
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setURL(e.target.value);
    };

    const urlValidate = () => {
        if (
            !/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?/gi.test(
                url
            )
        ) {
            setUrlError("Invalid URL");
        } else {
            setUrlError("");
        }
    };

    const onSelectorDelete = (selectorToDelete: string) => {
        const newSelectors = [...selectors];
        setSelectors(
            newSelectors.filter((newSelector) => newSelector !== selectorToDelete)
        );
    };

    const onSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSelector(e.target.value);
    };

    const onKeyUpSelector = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSelectorAdd();
        }
    };

    const onSelectorAdd = () => {
        if (newSelector === "" || selectors.includes(newSelector)) return;
        setSelectors((selectors) => [...selectors, newSelector]);
        setNewSelector("");
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
        if (props.isAddAction && props.onAdd) {
            props.onAdd({
                id: row.id,
                name,
                url,
                selectors,
                type,
            });
            toggleOpen();
        } else if (props.onUpdate) {
            props.onUpdate({
                id: row.id,
                name,
                url,
                selectors,
                type,
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
                <TableCell align="left">{row.url}</TableCell>
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
                                        helperText={urlError}
                                        error={!!urlError}
                                        required
                                        label="URL"
                                        defaultValue={row.url}
                                        onChange={onURLChange}
                                        onBlur={urlValidate}
                                    />
                                    <FormControl>
                                        <InputLabel id="select-type">Type</InputLabel>
                                        <Select
                                            labelId="select-type"
                                            id="select-type"
                                            defaultValue={row.type}
                                            label="Type"
                                            onChange={onTypeChange}
                                        >
                                            <MenuItem value="css">CSS</MenuItem>
                                            <MenuItem value="xpath">XPath</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                {selectors?.length > 0 && (
                                    <>
                                        <InputLabel required htmlFor="selectors" variant="filled">
                                            Selectors
                                        </InputLabel>
                                        <FormControl fullWidth>
                                            <Paper
                                                id="selectors"
                                                variant="outlined"
                                                sx={{
                                                    maxHeight: 200,
                                                    overflowY: "scroll",
                                                    p: 2,
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {selectors.map((selector: string, index) => {
                                                    return (
                                                        <Chip
                                                            key={selector + index}
                                                            sx={{m: "3px"}}
                                                            label={selector}
                                                            onDelete={() => {
                                                                onSelectorDelete(selector);
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Paper>
                                        </FormControl>
                                    </>
                                )}
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="add-selector">Selector</InputLabel>
                                    <OutlinedInput
                                        sx={{minWidth: "130px"}}
                                        id="add-selector"
                                        label="Selector"
                                        value={newSelector}
                                        placeholder="Add selector"
                                        onChange={onSelectorChange}
                                        onKeyUp={onKeyUpSelector}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="add selector"
                                                    onClick={onSelectorAdd}
                                                >
                                                    <AddCircleIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
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
                                        disabled={!!urlError || !selectors?.length}
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
