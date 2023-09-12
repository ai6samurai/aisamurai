import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import createStory from '../StoryGenAnalysis';

import { FormControl, FormLabel, TextField, Button, Container, Box, Typography, MenuItem, Select, InputLabel } from '@mui/material';

const box_sx = {
    marginTop: 5,
    gap: 5,
    display: 'flex',
    alignItems: 'center',
    width: '100vh',
    opacity: 1
}

const GenerateStory = () => {

    

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [theme, setTheme] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [isThemeValid, setIsThemeValid] = useState(false);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);

        // Check if the value is not empty
        setIsNameValid(value.trim() !== '');
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleThemeChange = (event) => {
        const value = event.target.value;
        setTheme(value);

        // Check if the value is not empty
        setIsThemeValid(value.trim() !== '');
    };
    

    const navigate = useNavigate();
    const handleSubmit = () => {
        // Assuming you have a function to handle the data
        if (isNameValid && isThemeValid) {
            const userData = {
                name,
                age,
                theme,
            };
            // createStory(age, theme, name);
            console.log(name, age, theme);
            navigate('/read-story');
        } else {
            alert('Please enter a Name and Theme before submitting.');
        }
    };
    return (
        <Container
            sx={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 0
            }}>
            <Box
                sx={{
                    height: '60vh', width: '60vh',
                    textAlign: 'center', m: 1,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: 0.7
                }}>

                <Typography sx={{ marginTop: 5, fontSize: 20 }}>Tell us a little bit about yourself!</Typography>

                <Container sx={{
                    backgroundColor: 'lightgrey',
                    borderRadius: 5,
                    width: '50vh',
                    height: '50%',
                    mx: 'auto',
                    opacity: 1,
                    zIndex: 2
                }}>


                    <Box sx={box_sx}>
                        <Typography sx={{ marginTop: 2, fontSize: 20, ml: 0 }}>Who are you?</Typography>
                        <TextField id='name' sx={{ mr: 0, left: 35 }} label='Your Name' variant='standard' color='primary' onChange={handleNameChange}></TextField>
                    </Box>

                    <Box sx={box_sx}>
                        <Typography sx={{ marginTop: 2, fontSize: 20, ml: 0 }}>How old are you?</Typography>
                        {/* <TextField sx={{ mr: 0 }} label='Age' variant='standard' color='secondary'></TextField> */}
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="age"
                                value={age}
                                label="Age"
                                onChange={handleAgeChange}
                            >
                                <MenuItem value={5}>3 to 5</MenuItem>
                                <MenuItem value={9}>6 to 9</MenuItem>
                                <MenuItem value={12}>10 to 12</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>

                    <Box sx={box_sx}>
                        <Typography sx={{ marginTop: 2, fontSize: 20, ml: 0 }}>Story Theme:</Typography>
                        <TextField id='theme' sx={{ mr: 0, left: 35 }} label='Ex: Space Cowboys' variant='standard' color='primary' onChange={handleThemeChange}></TextField>
                    </Box>
                </Container>

                <Button sx={{ mt:5 }} variant='contained' onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Container>
    )
}
export default GenerateStory;