import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

/**
A custom React Hook that provides access to the OpenAI API.
@returns {{
  api: OpenAIApi | null,
  setApiKey: (key: string) => void
  }} An object containing the current instance of OpenAIApi and a function to set the API key.
  */
export const useOpenAI = () => {
  const [api, setApi] = useState<OpenAIApi | null>(null);

  const setApiKey = (key: string) => {
    const configuration = new Configuration({
      apiKey: key
    });
    const openai = new OpenAIApi(configuration);

    setApi(openai);
  };

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  return {
    api,
    setApiKey
  };
};
