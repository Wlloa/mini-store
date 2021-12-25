import { Alert, IconButton } from "@mui/material";
import Ract, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotifiacionContainer from "./NotifiactionContainer";
import { StyledProps } from "../../models/interfaces";
import styled from "@emotion/styled";
import { Timer } from "@mui/icons-material";

interface NoticationProps extends StyledProps {
  text: string;
  type: "error" | "warning" | "info" | "success";
  show: boolean;
  toggle: () => void;
  autoclose?: boolean;
}

const Notification = (props: NoticationProps): JSX.Element => {
  const { text, type, show, toggle, className, autoclose } = props;

  const selfClose = autoclose || true;

  useEffect(() => {
    if (show && selfClose) {
      const timer = setTimeout(() => {
        toggle();
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [show]);

  return (
    <div className={className}>
      <NotifiacionContainer show={show}>
        <Alert
          variant="filled"
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={toggle}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </NotifiacionContainer>
    </div>
  );
};

// const Notification = styled(UnestyledNotification)`
//   position: absolute;
//   top: 64px;
//   left: 0;
// `;

// const Notification = styled(UnestyledNotification)<StyledProps>(() => ({
//   position: "absolute",
//   top: 64,
//   right: 0,
// }));

export default Notification;
