import * as React from 'react'
import Header from './Header'

import { FormControl, FormLabel, TextField, Button, Container, Box, Typography } from '@mui/material';

const GenerateStory = () => {

    const box_sx = {
        marginTop: 5,
        gap: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '50vh',
        mx: 'auto',
        opacity: 1
    }
    return (
        <Container
            sx={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Box
                sx={{
                    height: '60vh', width: '60vh',
                    textAlign: 'center', m: 1,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: 0.5
                }}>

                <Typography sx={{ marginTop: 5, fontSize: 20 }}>Tell us a little bit about yourself!</Typography>

                <Container sx={{
                    justifyContent: 'center',
                    backgroundColor: 'darkgrey',
                    borderRadius: 5,
                    width: '50vh',
                    mx: 'auto'
                }}>


                    <Box sx={box_sx}>
                        <Typography sx={{ marginTop: 2, fontSize: 20, }}>Who are you?</Typography>
                        <TextField label='Your Name' variant='filled' color='secondary'></TextField>
                    </Box>

                    <Box sx={box_sx}>
                        <Typography sx={{ marginTop: 2, fontSize: 20 }}>How old are you?</Typography>
                        <TextField label='Age' variant='filled' color='secondary'></TextField>
                    </Box>
                </Container>
            </Box>
        </Container>
    )
}
export default GenerateStory;