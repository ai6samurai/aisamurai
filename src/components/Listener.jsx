import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import OutlinedCard from './StoryCard';

const dummyStory = "Once upon a time there was a magical unicorn named Rain. Rain loved to explore the beautiful countryside and look for rainbows. One sunny day, Rain trotted through a meadow filled with colorful flowers looking high and low for rainbows but couldn't find any. Rain kept searching all over the countryside, in the valleys, across the rivers, and up on the hills but no rainbows appeared. \n\nFeeling sad, Rain sat down under a tree. Just then, a few raindrops started falling. Rain looked up and saw some dark clouds in the sky. The raindrops soon turned into a rainfall that got heavier and heavier. Rain waited patiently under the tree, watching the rain fall. \n\nAfter a while, the rain slowed down and eventually stopped. As the clouds started clearing, Rain noticed a colorful glow appearing through the trees. Rain walked toward the light and discovered the most beautiful rainbow stretched across the whole sky! \n\nThe rainbow's vibrant colors of red, orange, yellow, green, blue, indigo and violet sparkled brightly. Rain happily danced below the rainbow, filled with joy to finally find one after searching all day. From that day on, Rain loved to play and splash in the rain, knowing a magical rainbow would always follow.One night, Max was looking at the stars through his new telescope. He noticed a bright light zooming across the sky. A shooting sta";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


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

  const [chosenGif, setChosenGif] = useState("/assets/Happy.gif");


  const changeGif = () => {
    let gifnumber = getRandomInt(4);
    console.log(gifnumber);
    switch (gifnumber) {
      case 0:
        setChosenGif("/assets/stressed.gif");
        break;
      case 1:
        setChosenGif("/assets/Happy.gif");
        break;
      case 2:
        setChosenGif("/assets/Tired.gif");
        break;
    }
  }
  

  useEffect(() => {
    const interval = setInterval(() => {
      changeGif();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (       
    <Box sx={{  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '80vh', width: '50vh'}}>
     <Box sx={{marginRight: 8}}>
     <OutlinedCard story={story} />
     </Box>
     <Box sx={{ backgroundColor: '#FFF', borderRadius: '50%', marginLeft: 5, marginRight: 5, padding: '0.2rem'}}>
     <IconButton variant="contained" size='large' onClick={handleClick}>
       {isMicOn ? <MicOffIcon /> : <MicIcon />}
       </IconButton> 
       </Box>
       <Box sx={{marginLeft: 8}}>
       <img width="300" height="500" src={chosenGif}></img>
     </Box>
   </Box>
 );
};

export default Listener;
