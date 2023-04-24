import { renderHook } from "@testing-library/react";
import { OpenAIApi } from "openai";
import { CONTEXT, useChat } from "./useChat";

describe("useChat", () => {
  const mockApi: OpenAIApi =
    jest.fn() as jest.Mocked<unknown> as jest.Mocked<OpenAIApi>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set a message to enter API key if no API is passed in props", () => {
    const { result } = renderHook(() =>
      useChat({ setApiKey: jest.fn(), removeApi: jest.fn(), api: null })
    );
    expect(result.current.messages[0].content).toEqual(
      "Please enter your API key:"
    );
  });

  it("should set initial messages if API is passed in props", () => {
    const { result } = renderHook(() =>
      useChat({ setApiKey: jest.fn(), removeApi: jest.fn(), api: mockApi })
    );
    expect(result.current.messages[0].content).toEqual(CONTEXT);
    expect(result.current.messages[1].content).toEqual(
      "Hi, I am BaccaratAI how can I help you?"
    );
  });
});
