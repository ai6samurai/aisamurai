import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Welcome from './components/Welcome';
import GenerateStory from './components/GenerateStory';
import Listener from './components/Listener';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="generate-story" element={<GenerateStory />} />
      </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
