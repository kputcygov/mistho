import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import {ScrapersService} from "./api/api";

import {ScrapersEntity} from "./App.types";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";

export const App = () => {

    const scrapersService = new ScrapersService();
    const [open, setOpen] = useState(false);

    const [scrapers, setScrapers] = useState<ScrapersEntity[]>([]);
    const [scraperToUpdate, setScraperToUpdate] = useState<ScrapersEntity | undefined>();
    const [numOfDone, setNumOfDone] = useState(0);

    const getNewEmptyTodo = (): ScrapersEntity => ({
        id: nanoid(),
        name: "",
        url: "",
        selectors: [],
        type: "",
    });

    const [newScraper, setNewScraper] = useState<ScrapersEntity>(getNewEmptyTodo());

    useEffect(() => {
        // fetch(`/scrapers`)
        //     .then((r) => r.json())
        //     .then((scrapers) => {
        //         setScrapers(scrapers);
        //         // setNumOfDone(scrapers.filter((scraper: ScapersEntity) => scraper.done).length);
        //     });
        scrapersService.getAll('/scrapers').then((scrapers) => setScrapers(scrapers));
    }, []);

    const deleteScraper = (id: string) => {
        const newScrapers = [...scrapers];
        const ind = scrapers.findIndex(scraper => scraper.id === id)
        if (ind > -1) {
            newScrapers.splice(ind, 1);
        }
        setScrapers(newScrapers);
        // setNumOfDone(scrapers.filter((scraper: ScapersEntity) => scraper.done).length);
        scrapersService.delete(scrapers[ind].id, scrapers[ind]);
    };

    const rows = [
        {name: 'Google', url: 'google.com', selectors: ['p', '.main-component > image'], type: 'css'},
        {name: 'Apple', url: 'apple.com', selectors: Array(15).fill('AAAA'), type: 'css'},
        {name: 'Youtube', url: 'youtube.com', selectors: [], type: 'css'},
        {name: 'Engadget', url: 'engadget.com', selectors: [], type: 'css'},
        {name: 'Ted', url: 'ted.com', selectors: [], type: 'css'},
    ];

    function Row(props: { row: ReturnType<any> }) {
        const {row} = props;
        const [open, setOpen] = React.useState(false);

        const toggleOpen = () => {
            setOpen(open => !open);
        }

        const deleteScraper = () => {

        }

        return (
            <>
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell align='left' component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="left">{row.url}</TableCell>
                    <TableCell align='right'>
                        <IconButton
                            aria-label="edit scraper"
                            size="medium"
                            onClick={toggleOpen}
                        >
                            {!open ? <ModeEditIcon/> : <CloseIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell align='right'>
                        <IconButton
                            aria-label="delete scraper"
                            size="medium"
                            onClick={deleteScraper}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Edit
                                </Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        justifyContent: 'space-between',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <TextField
                                            required
                                            label='Name'
                                            defaultValue={row.name}
                                        />
                                        <TextField
                                            required
                                            label='URL'
                                            defaultValue={row.url}
                                        />
                                        <TextField
                                            required
                                            label='Type'
                                            defaultValue={row.type}
                                        />
                                    </Box>
                                    {row.selectors.length !== 0 && (
                                        <><InputLabel required htmlFor="selectors"
                                                      variant='filled'>Selectors</InputLabel>
                                            <FormControl fullWidth>
                                                <Paper id='selectors'
                                                       variant='outlined'
                                                       sx={{
                                                           maxHeight: 200,
                                                           overflowY: 'scroll',
                                                           p: 2,
                                                           flexWrap: 'wrap',
                                                       }}>
                                                    {row.selectors.map((selector: string) => {
                                                        return (
                                                            <Chip
                                                                sx={{m: '3px'}}
                                                                label={selector}
                                                                onDelete={() => {
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </Paper>
                                            </FormControl>
                                        </>
                                    )}
                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor='add-selector'>Selector</InputLabel>
                                        <OutlinedInput
                                            sx={{minWidth: '130px'}}
                                            id="add-selector"
                                            label='Selector'
                                            placeholder='Add selector'
                                            onChange={(e) => {
                                            }}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    console.log(e.key);
                                                }
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="add selector"
                                                        onClick={() => {
                                                        }}
                                                    >
                                                        <AddCircleIcon/>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                    }}>
                                        <Button
                                            onClick={() => {
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                            }}
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
    }

    return (
        <Paper sx={{width: '70%'}} elevation={3}>
            <TableContainer sx={{maxHeight: 640}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align="left">URL</TableCell>
                            <TableCell align='right'>Edit</TableCell>
                            <TableCell align='right'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={5}
                page={0}
                onPageChange={() => {
                }}
                onRowsPerPageChange={() => {
                }}
            />
        </Paper>
    );
};
