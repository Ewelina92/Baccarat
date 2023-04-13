import React from "react";

export const useAudio = (src: string) => {
  const audio = React.useRef(new Audio(src));

  return audio.current;
};
