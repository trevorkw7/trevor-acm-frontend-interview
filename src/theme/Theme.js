import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  colors: {},
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000"
    },
    secondary: {
      main: "#62b0ff",
      contrastText: "#000"
    },
    general: {
      main: "#62b0ff",
      dark: "#419fff",
      light: "#bbdcff",
      contrastText: "#fff"
    },
    cyber: {
      main: "#51c0c0",
      light: "#84d2d3",
      dark: "#28b1b0",
      contrastText: "#fff"
    },
    innovate: {
      main: "#816dff",
      light: "#a998fd",
      dark: "#594cff",
      contrastText: "#fff"
    },
    hack: {
      main: "#f9a857",
      light: "#fbb76e",
      dark: "#f69b4c",
      contrastText: "#fff"
    },
    ai: {
      main: "#ff6f6f",
      light: "#ff9998",
      dark: "#ff4847",
      contrastText: "#fff"
    },
    design: {
      main: "#e886a3",
      light: "#f1b5c8",
      dark: "#df5680",
      contrastText: "#fff"
    },
    link: {
      main: "#0659bc",
      light: "#42a5f5",

      contrastText: "#fff"
    }
  },
  typography: {
    h6: {
      fontWeight: 900,
      fontSize: "1rem"
    },
    h5: {
      fontWeight: 800
    },
    h4: {
      fontWeight: 800
    },
    h3: {
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h1: {
      fontWeight: 600
    }
  }
});

export const getTitleColor = (committee) => {
  switch (committee) {
    case "General":
      return theme.palette.general.main;

    case "Hack":
      return theme.palette.hack.main;

    case "Cyber":
      return theme.palette.cyber.main;

    case "Innovate":
      return theme.palette.innovate.main;

    case "AI":
      return theme.palette.ai.main;

    case "Design":
      return theme.palette.design.main;

    default:
      return theme.palette.general.main;
  }
};
