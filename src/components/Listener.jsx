import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

const Listener = () => {
  const [buttonText, setButtonText] = useState('Start Recording');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Add a state variable to track whether recording is in progress
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = async () => {
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

  function record(buffer) {
    encoder = new WavAudioEncoder(sampleRate, numChannels);
    encoder.encode(buffer);
    let blob = encoder.finish(options.wav.mimeType)
    let sentimentAnalysis = "";
  
    // Send blob to Mirro
    const payload = new FormData();
    const currentDate = new Date(Date.now()).toDateString();
    const format = "wav"
    payload.append('session_type_ids', '3');
    payload.append('x-api-key', '9a702e0a-2b5a-5e85-8623-a08cdf40c4b1');
    payload.append('files', blob, `${currentDate}.wav`);

    fetch("https://ci-mirro-api.proudtree-c5071a26.canadacentral.azurecontainerapps.io/docs#/UploadMultipleFiles")
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }})
        .then((jsonResponse) => {
          console.log("Successfully uploaded file");
          console.log(jsonResponse);
          //status1.innerHTML = JSON.stringify(jsonResponse);
          const job_id = JSON.parse(JSON.stringify(jsonResponse));

          emotion = "Emotion: " + sentiment.message.overall_emotion_name + "<br>";
  
        //   sentimentAnalysis += "Emotion: " + sentiment.message.emotion + "<br>";
        //   sentimentAnalysis += "Energy: " + sentiment.message.energy + "<br>";
        //   sentimentAnalysis += "Confidence: " + (sentiment.message.confidencepercent)*100 + "%<br>";
        //   sentimentAnalysis += "Engagement: " + sentiment.message.engagementScore + "%<br>";
        //   sentimentAnalysis += "Fatigue: " + sentiment.message.fatigue + "<br>";
        //   sentimentAnalysis += "Irritation: " + sentiment.message.irritation + "<br>";
        //   sentimentAnalysis += "Kudos: " + sentiment.message.kudos + "<br>";
        //   sentimentAnalysis += "Tip: " + sentiment.message.tip + "<br>";
          console.log("worker " + sentimentAnalysis);
          sentimentUpdate(sentimentAnalysis)
        }).catch((error) => {
      console.log(error);
    });
  
  };

  return (
    <Box
      sx={{
        height: '80vh',
        width: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        m: 1,
      }}
    >
      <Button variant="contained" onClick={handleClick}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default Listener;
