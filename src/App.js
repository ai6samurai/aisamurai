import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'
import { Container, Box, Typography } from '@mui/material';
import Welcome from './components/Welcome';
import GenerateStory from './components/GenerateStory';
import Listener from './components/Listener';
import './App.css';

const App = () => {
  return (
    <> 
    <Container maxWidth="lg" 
    sx={{
      marginTop: 8,
      backgroundImage: "url('sky_monkey.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center', m: 1,
        zIndex: '1'
    }}>
  <Typography 
        sx={{
          fontFamily:'Kranky', fontSize: '48px',
          color: '#3C3838',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          textAlign: 'center', m: 1
          }}>
        StoryLand  
      </Typography>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="generate-story" element={<GenerateStory />} />
        </Routes>
      </BrowserRouter>
      </Container>
      </>
   
  );
}

export default App;
