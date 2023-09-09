import { FormControl, FormLabel, TextField, Button, Container, Box, Typography } from '@mui/material';

const GenerateStory = () => {
    <>
    <Box sx={{ height: '80vh', width: '50vh',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center', m: 1
            }}>

            </Box>
    <Container>
         <div>Welcome</div>
        <Typography>Hello You</Typography>
        <Box>
        <FormControl>
            <FormLabel>Enter Name</FormLabel>
                <TextField></TextField>
                <Button>Submit</Button>
            </FormControl>
        </Box>
    </Container>
    </>
}
export default GenerateStory;