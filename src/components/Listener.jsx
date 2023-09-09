import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import OutlinedCard from './StoryCard';

const dummyStory = "One night, Max was looking at the stars through his new telescope. He noticed a bright light zooming across the sky. A shooting sta";

const Listener = () => {
  const [buttonText, setButtonText] = useState('Start Recording');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Add a state variable to track whether recording is in progress
  const [isRecording, setIsRecording] = useState(false);
  const [story, SetStory] = useState('');
  const [isMicOn, setIsMicOn] = useState(false);
  useEffect(() => {
      SetStory(dummyStory);
  },[]);

  const handleClick = async () => {
    setIsMicOn(!isMicOn);
    if (buttonText === 'Start Recording') {
      try {
        setButtonText('Pause');
        startCapture();
      } catch (error) {
        console.error('Cannot access microphone:', error);
      }
    } else {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
      }
    }
  };

  const startCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks([...audioChunks, event.data]);
      }

      // Calculate the recording duration
      const recordingDuration = audioChunks.length * 1000;

      // Check if the desired recording duration (3 seconds) is reached
      if (isRecording && recordingDuration >= 3000) {
        createAndDownloadWavFile();
        stopRecording();
      }
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setButtonText('Start Recording');
      setIsRecording(false);
    }
  };

  const createAndDownloadWavFile = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);

  };



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
};

export default Listener;
