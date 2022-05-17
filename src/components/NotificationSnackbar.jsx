import * as React from "react";
import ReactDom from "react-dom";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNotificationContext } from "../context/NotificationContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationSnackbarComponent = () => {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage } =
    useNotificationContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success" onClose={handleClose}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

const NotificationSnackbar = () => {
  return (
    <>
      {ReactDom.createPortal(
        <NotificationSnackbarComponent />,
        document.getElementById("notification-root")
      )}
    </>
  );
};

export default NotificationSnackbar;
