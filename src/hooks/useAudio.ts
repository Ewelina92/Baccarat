import React from "react";

/**
A custom hook that returns an HTMLAudioElement with the specified source URL.
@param {string} src - The URL of the audio file.
@returns {HTMLAudioElement} The HTMLAudioElement object representing the audio file.
*/
export const useAudio = (src: string) => {
  const audio = React.useRef(new Audio(src));

  return audio.current;
};
