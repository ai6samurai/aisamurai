import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Welcome = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("Clicked");
        navigate('/generate-story');
      }

    return (
        <Box sx={{ height: '80vh', width: '50vh',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center', m: 1
            }}>
            <Typography 
              sx={{
                color: '#2D2D1D',
                fontFamily: 'Kreon',
                fontSize: '1rem',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}>
                Unleash Your Storytelling Superpowers!
            </Typography>
            <Box  sx={{marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography>
              Unlock the Magic of Reading!
            </Typography>
            <Button sx={{marginTop: 2}} variant="contained" onClick={handleClick}>Enter</Button>
            </Box>
            </Box>
    )
}
export default Welcome;