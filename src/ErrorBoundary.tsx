import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <h1 style={{ textAlign: "center" }}>Sorry, something went wrong.</h1>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
