import React, { useEffect, useState } from 'react';

const AudioChunks = () => {
  const [audioChunks, setAudioChunks] = useState([]);

  // Function to send an audio blob to the API
  const sendAudioToApi = async (audioBlob, index) => {
    try {
      // Create a FormData object to send the audio file
      const formData = new FormData();
      formData.append('x-api-key', '9a702e0a-2b5a-5e85-8623-a08cdf40c4b1')
      formData.append('files', audioBlob, `chunk-${index}.wav`); // 'audio' is the field name

      // Make a POST request to the API endpoint
      const response = await fetch('https://pd-mirro-api.gentledune-75b0834d.eastus.azurecontainerapps.io/docs#/UploadMultipleFiles', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the API response
      const responseData = await response.json();
      console.log(`API response for chunk-${index}.wav:`, responseData);
      const sentiment = JSON.parse(JSON.stringify(responseData));
      console.log(`API response:`, sentiment);
    } catch (error) {
      console.error(`Error sending chunk-${index}.wav to API:`, error);
    }
  };

  // Function to convert an AudioBuffer into a WAV file
  const createWavFile = (audioBuffer, index) => {
    const audioBlob = new Blob([audioBuffer.getChannelData(0)], { type: 'audio/wav' });
    sendAudioToApi(audioBlob, index); // Send the audio blob to the API
  };

  useEffect(() => {
    // Function to load the audio file
    const loadAudioFile = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await fetch(process.env.PUBLIC_URL + '/audio_sample_speaker_map.wav')
          .then((response) => response.arrayBuffer())
          .then((data) => audioContext.decodeAudioData(data));

        // Calculate the number of 3-second chunks
        const chunkSize = audioContext.sampleRate * 3;
        const numChunks = Math.ceil(audioBuffer.duration / 3);

        // Create and send a WAV file for each 3-second chunk
        for (let i = 0; i < numChunks; i++) {
          const startSample = i * chunkSize;
          const endSample = Math.min((i + 1) * chunkSize, audioBuffer.length);
          const chunkData = audioBuffer.getChannelData(0).slice(startSample, endSample);
          const chunkAudioBuffer = audioContext.createBuffer(1, chunkData.length, audioContext.sampleRate);
          chunkAudioBuffer.copyToChannel(chunkData, 0);

          createWavFile(chunkAudioBuffer, i);
        }
      } catch (error) {
        console.error('Error loading audio file:', error);
      }
    };

    loadAudioFile();
  }, []);

  return (
    <div>
      {audioChunks.map((chunk, index) => (
        <audio key={index} controls>
          <source src={URL.createObjectURL(new Blob([chunk.getChannelData(0)], { type: 'audio/wav' }))} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
};

export default AudioChunks;
