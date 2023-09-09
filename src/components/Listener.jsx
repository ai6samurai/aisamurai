import { Container, Box, Typography, Button } from '@mui/material';

const Listener = () => {

    const handleClick = () => {
        console.log("Clicked");
      }

    return (
        <Box sx={{ height: '80vh', width: '50vh',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center', m: 1
            }}>
        <Button variant="contained" onClick={handleClick}> Start Reading
            </Button>    
        </Box>
    )
}
export default Listener;