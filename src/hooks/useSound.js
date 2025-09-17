import React, { useEffect, useRef, useCallback } from 'react';

const useSound = (url) => {
  // Use a ref to hold the audio object. This prevents it from being recreated on every render.
  const audioRef = useRef(null);

  // Create the Audio object only once when the component mounts
  useEffect(() => {
    if (url) {
      audioRef.current = new Audio(url);
    }
  }, [url]); // This effect runs only if the URL changes

  // Create a stable function to play the sound
  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to the start
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, []);

  return play;
};

export default useSound;