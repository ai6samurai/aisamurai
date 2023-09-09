import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'
import { Container, Box, Typography } from '@mui/material';
import Welcome from './components/Welcome';
import GenerateStory from './components/GenerateStory';
import Listener from './components/Listener';
import './App.css';

const App = () => {
  return (
            <BrowserRouter  >   
            <Routes>
          <Route path="/" element={<Welcome />} />
        <Route path="generate-story" element={<GenerateStory />} />
      </Routes>
      </BrowserRouter>
   
  );
}

export default App;
