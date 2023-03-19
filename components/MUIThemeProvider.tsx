import { useTheme } from "next-themes";
import CssBaseline from "@mui/material/CssBaseline";
import { FC, useMemo } from "react";
import { ThemeProvider, createTheme, css } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #000;
    }
  }
  [data-theme="dark"] {
    body {
      background-color: #0c0d0e;
      color: #fff;
    }
  }
`;

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const theme = useMemo(() => {
    const isDark = resolvedTheme === "dark";
    const t = createTheme({
      palette: {
        mode: isDark ? "dark" : "light",
        background: {
          default: isDark ? "#0C0D0E" : "#FFFFFF",
          paper: isDark ? "#121212" : "#FFFEFC",
        },
        primary: { main: "#594176" },
        secondary: { main: "#334176" },
      },
      typography: {
        fontFamily: [
          "Noto Serif Hebrew",
          "monospace",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            a: {
              color: "#334176",
            },
            "a:hover": {
              color: "#594176",
            },
            blockquote: {
              color: "#594176",
              borderLeft: "1px solid ##594176",
              paddingLeft: "20px",
              marginLeft: "0px",
            },
          },
        },
      },
    });
    t.typography.h1 = {
      fontSize: "3rem",
      "@media (min-width:600px)": {
        fontSize: "3.5rem",
      },
      [t.breakpoints.up("md")]: {
        fontSize: "4rem",
      },
    };
    t.typography.h2 = {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      [t.breakpoints.up("md")]: {
        fontSize: "3rem",
      },
    };
    t.typography.h3 = {
      fontSize: "1.2rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      [t.breakpoints.up("md")]: {
        fontSize: "2rem",
      },
    };
    return t;
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
