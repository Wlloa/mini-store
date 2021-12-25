import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PropsChildren {
  children: React.ReactNode;
  show: boolean;
}

const NotifiacionContainer = (props: PropsChildren): JSX.Element | null => {
  const { children, show } = props;
  const [portalDiv, setPortalDiv] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalDiv(document.getElementById("notification"));
  }, []);

  return portalDiv && show ? ReactDOM.createPortal(children, portalDiv) : null;
};

export default NotifiacionContainer;
