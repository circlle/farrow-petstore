import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import CustomThemeProvider from "./components/shared/CustomThemeProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={2000} maxSnack={2}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
