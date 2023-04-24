import { renderHook, act } from "@testing-library/react";
import { OpenAIApi } from "openai";
import { useOpenAI } from "./useOpenAI";

describe("useOpenAI", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should return an object with api, setApiKey and removeApi", () => {
    const { result } = renderHook(() => useOpenAI());
    expect(result.current.api).toBeNull();
    expect(typeof result.current.setApiKey).toBe("function");
    expect(typeof result.current.removeApi).toBe("function");
  });

  it("should set api when setApiKey is called", () => {
    const { result } = renderHook(() => useOpenAI());

    act(() => {
      result.current.setApiKey("my_api_key");
    });

    expect(result.current.api).toBeInstanceOf(OpenAIApi);
    expect(localStorage.getItem("baccaratOpenAIKey")).toBe("my_api_key");
  });

  it("should set api when the key is found in localStorage", () => {
    localStorage.setItem("baccaratOpenAIKey", "my_api_key");
    expect(localStorage.getItem("baccaratOpenAIKey")).toBe("my_api_key");
    const { result } = renderHook(() => useOpenAI());
    expect(result.current.api).toBeInstanceOf(OpenAIApi);
  });

  it("should remove api and key when removeApi is called", () => {
    localStorage.setItem("baccaratOpenAIKey", "my_api_key");
    const { result } = renderHook(() => useOpenAI());

    expect(result.current.api).not.toBeNull();

    act(() => {
      result.current.removeApi();
    });

    expect(result.current.api).toBeNull();
    expect(localStorage.getItem("baccaratOpenAIKey")).toBeNull();
  });
});
