import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
}

function AlertSuccess(props: Props) {
  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        props.setOpen(false);
      }, 3000);
    }
  }, [props.open]);
  return (
    <>
      {props.open ? (
        <Alert
          style={{ position: "fixed", top: 10, left: 10 }}
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
        >
          {props.label}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}

export default AlertSuccess;
