import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";

const theme = createTheme({
  palette: {
    primary: {
      main: "#094067",
    },
    secondary: {
      main: "#3da9fc",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
