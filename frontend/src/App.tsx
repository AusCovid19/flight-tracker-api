import React, { useState } from "react";

import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

import useAppStyles from "./AppStyles";
import AppTable from "./components/Table";
import {
  createMuiTheme,
  useMediaQuery,
  MuiThemeProvider
} from "@material-ui/core";
import { blue, deepOrange } from "@material-ui/core/colors";

function AppCore() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const muitheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: deepOrange,
      type: prefersDarkMode ? "dark" : "light"
    }
  });

  return (
    <MuiThemeProvider theme={muitheme}>
      <App />
    </MuiThemeProvider>
  );
}
function App() {
  const [searchString, setSearchString] = useState("");
  const classes = useAppStyles();
  return (
    <div className={classes.root}>
      <ApplicationBar
        handleSearch={searchTerm => {
          setSearchString(searchTerm);
        }}
      />
      <AppTable searchTerm={searchString} />
      <Footer />
    </div>
  );
}

export default AppCore;
