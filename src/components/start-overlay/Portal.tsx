import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const overlayElement = document.getElementById("overlay") as HTMLDivElement;
  return ReactDOM.createPortal(children, overlayElement);
};
