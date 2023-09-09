import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import OutlinedCard from './StoryCard';

const dummyStory = "One night, Max was looking at the stars through his new telescope. He noticed a bright light zooming across the sky. A shooting star! Max said. But this was no ordinary star...As Max watched closely, the glowing object changed course and headed straight for him! Max jumped back as a round, metal ship landed in his backyard. A door opened with a hiss and out walked two little green aliens! Max couldn't believe it - real aliens in his backyard! Hi, I'm Max! he said. The aliens told Max all about their home planet as they munched cookies and sipped juice boxes.When it was time for the aliens to leave, they invited Max to visit Zotron one day. Max waved goodbye as the round ship zoomed back into the starry sky."

const Listener = () => {
    const [story, SetStory] = useState('');
    const [isMicOn, setIsMicOn] = useState(false);
    useEffect(() => {
        SetStory(dummyStory);
    },[]);

    const handleClick = () => {
        setIsMicOn(!isMicOn);
    }
    return (       
         <Box sx={{  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '80vh', width: '50vh'}}>
          <Box sx={{marginRight: 8}}>
          <OutlinedCard story={story} />
          </Box>
          <Box sx={{ backgroundColor: '#FFF', borderRadius: '50%', marginLeft: 5, marginRight: 5, padding: '0.2rem'}}>
          <IconButton variant="contained" size='large'  onClick={handleClick}>
            {isMicOn ? <MicOffIcon /> : <MicIcon />}
            </IconButton> 
            </Box>
            <Box sx={{marginLeft: 8}}>
            <OutlinedCard story={story} />
          </Box>
        </Box>
      );
}
export default Listener;