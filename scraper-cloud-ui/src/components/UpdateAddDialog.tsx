import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { ScrapersEntity } from '../App.types';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

// export interface SimpleDialogProps {
//     open: boolean;
//     selectedValue: string;
//     onClose: (scraper: ScapersEntity) => void;
// }

export const UpdateAddDialog = ({ scraper, open, onClose }: {
    scraper: ScrapersEntity,
    open: boolean;
    onClose: (scraperToUpdate: ScrapersEntity) => void; id?: string
}) => {
    // const { onClose, selectedValue, open } = props;



    // const upScrapers = [scrapers.find(el => el.id === updatedId)]
    console.log('scraper recived', scraper);
    const [scraperToUpdate, setScraperToUpdate] = useState(scraper);
    const [xpaths, setXpaths] = useState<string[]>(scraperToUpdate.selectors)
    const [newXpath, setNewXpath] = useState<string>("")

    const handleClose = () => {
        onClose(scraperToUpdate);
    };

    const updateXpath = (e: any, i: number) => {
        // const newScrapers = [...scrapers];
        const newXpaths = [...xpaths];
        newXpaths[i] = e.target.value;
        setXpaths(newXpaths);
        setScraperToUpdate({ ...scraperToUpdate, selectors: newXpaths })
        // Api(`${apiUrl}/scrapers/${newScrapers[i].id}`, "put", newScrapers[i], console.log);
    };

    const updateValue = (e: ChangeEvent<HTMLInputElement>, scraperToUpdateParam: ScrapersEntity) => {
        const newScraper = { ...scraperToUpdateParam };
        newScraper.name = e.target.value;
        setScraperToUpdate(newScraper);
        // setScrapers(newScrapers);
        // Api(`${apiUrl}/scrapers/${newScrapers[i].id}`, "put", newScrapers[i], console.log);
    };

    const updateUrl = (e: ChangeEvent<HTMLInputElement>, scraperToUpdateParam: ScrapersEntity) => {
        const newScraper = { ...scraperToUpdateParam };
        newScraper.url = e.target.value;
        // setScrapers(newScrapers);
        setScraperToUpdate(newScraper);
        // Api(`${apiUrl}/scrapers/${newScrapers[i].id}`, "put", newScrapers[i], console.log);
    };

    const deletedXpath = (xpath: string) => {
        // const newScrapers = [...scrapers];
        const newXpaths = [...xpaths].filter((_xpath) => _xpath !== xpath);
        // newXpaths[i] = e.target.value;
        setXpaths(newXpaths);
        // Api(`${apiUrl}/scrapers/${newScrapers[i].id}`, "put", newScrapers[i], console.log);
    };

    const addNewXpath = (xpath: string) => {
        // const newScrapers = [...scrapers];
        const newXpaths = [...xpaths]
        newXpaths.push(newXpath);
        // newXpaths[i] = e.target.value;
        setXpaths(newXpaths);
        setNewXpath("");
        // Api(`${apiUrl}/scrapers/${newScrapers[i].id}`, "put", newScrapers[i], console.log);
    };

    // const handleListItemClick = (value: string) => {
    // //   onClose(value);
    // };

    return (
        <Dialog onClose={handleClose} open={open}>

            <DialogTitle>Update Scraper</DialogTitle>
            {/* <div>
                {upScrapers.map((upScraper: any, i: number) => (
                    <div>
                        <TextField
                            value={upScrapers[i]!.value}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateValue(e, i)}
                        />
                        <TextField
                            value={upScrapers[i]!.url}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateUrl(e, i)}
                        />
                    </div>))}
            </div> */}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    {/* {upScrapers.map((upScraper: any, i: number) => ( */}
                    <div>
                        <div>
                            <TextField
                                label="Scraper name"
                                value={scraperToUpdate.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateValue(e, scraperToUpdate)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Scraper url"
                                value={scraperToUpdate.url}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateUrl(e, scraperToUpdate)}
                            />
                        </div>
                    </div>
                    {/* ))} */}

                    {xpaths.map((xpath: string, i: number) => (
                        <div>
                            <div>
                                <TextField
                                    label="Xpath"
                                    value={xpath}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateXpath(e, i)}
                                />
                                <Button onClick={() => deletedXpath(xpath)}>Delete</Button>
                            </div>
                            {/* <div>
                                <TextField
                                    label="Scraper url"
                                    value={upScrapers[i]!.url}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateUrl(e, i)}
                                />
                            </div> */}
                        </div>))}
                    <div>
                        <TextField
                            label="New xpath"
                            value={newXpath}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewXpath(e.target.value)}
                        />
                        <Button onClick={() => addNewXpath(newXpath)}>Add new xpath</Button>
                    </div>

                </div>


            </Box>


        </Dialog>
    );
}