"use client"; // Add this at the top
import component from "../components";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { RecoilRoot } from "recoil"; // Assuming you're using Recoil

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

export default function RootLayout({ children }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <div>
          {component.sections.Header} {/* Render as JSX */}
          <div>{children}</div>
          {component.sections.Footer} {/* Render as JSX */}
        </div>
      </ThemeProvider>
    </RecoilRoot>
  );
}
