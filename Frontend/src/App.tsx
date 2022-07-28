import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import {GenericApiService} from "./api/api";

import {ScrapersEntity} from "./App.types";

import {Button} from "@mui/material";
import {OneRemMarginWrapper} from "./App.styled";
import ScraperRow from "./components/ScraperRow";

export const notExistingID = -2

export const App = () => {



    const scrapersService = new GenericApiService('scrapers');

    const [scrapers, setScrapers] = useState<ScrapersEntity[]>([]);

    useEffect(() => {
        scrapersService.getAll().then((scrapers) => setScrapers(scrapers));
    }, []);

    const onUpdate = (scraper: ScrapersEntity) => {
        scrapersService.update(scraper.id.toString(), scraper).then((newScraper) => {
            console.log('NEW', newScraper);
            setScrapers(scrapers.map((scraper) => scraper.id === newScraper.id ? newScraper : scraper))
        });
    }

    const onDelete = (id: number) => {
        scrapersService.delete(id.toString()).then((scraper) => setScrapers(scrapers.filter((s) => s.id !== scraper.id)));
        setScrapers((scrapers) => scrapers.filter(scraper => scraper.id !== id));
    };

    const onAdd = (scraper: ScrapersEntity) => {
        scrapersService.create(scraper).then((scraper) => {
            const scrapersWithoutPlacehold = scrapers.filter(scraper => scraper.id > 0);
            setScrapers([...scrapersWithoutPlacehold, scraper])
        });
    }

    const onCancel = () => {
        if (scrapers.some(scraper => scraper.id === notExistingID)) {
            setScrapers((scrapers) => scrapers.filter(scraper => scraper.id !== notExistingID));
        }
    }

    const addScraper = () => {
        setScrapers((scrapers) => [...scrapers, {id: notExistingID, name: '', url: '', type: 'css', selectors: []}]);
    }

    return (
        <Paper sx={{width: '70%', margin: 'auto'}} elevation={3}>
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
                        {scrapers.map((scraper) => {
                            if (scraper.id === notExistingID) {
                                return <ScraperRow
                                    key={scraper.id}
                                    row={scraper}
                                    isAddAction={true}
                                    onAdd={onAdd}
                                    onDelete={onDelete}
                                    onCancel={onCancel}
                                />
                            }
                            return <ScraperRow
                                key={scraper.id}
                                row={scraper}
                                isAddAction={false}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                onCancel={onCancel}
                            />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <OneRemMarginWrapper>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addScraper}
                    >
                        Add scraper
                    </Button>
                </OneRemMarginWrapper>

            </Box>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={scrapers.length}
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
