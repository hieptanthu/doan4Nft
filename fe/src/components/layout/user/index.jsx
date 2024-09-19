import { Outlet } from "react-router-dom";
import sections from "../../sections";
import common from "../../common";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff", // Define a valid primary color
    },
    secondary: {
      main: "#fff", // Ensure the secondary color has a `main` property
    },
  },
});
const LayoutUser = () => {
  var [loading] = useState(false);
  return (
    <>
      {loading ? (
        common.load.LoadBase // Render as JSX
      ) : (
        <ThemeProvider theme={theme}>
          <div>
            {sections.user.header} {/* Render as JSX */}
            <div>
              <Outlet /> {/* This will render the child routes */}
            </div>
            {sections.user.footer} {/* Render as JSX */}
          </div>
        </ThemeProvider>
      )}
    </>
  );
};
export default LayoutUser;
