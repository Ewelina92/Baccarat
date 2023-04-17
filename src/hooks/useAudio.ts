import React from "react";

export const useAudio = (src: string, { volume = 1 }) => {
  const audio = React.useRef(new Audio(src));

  React.useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);

  return audio.current;
};
