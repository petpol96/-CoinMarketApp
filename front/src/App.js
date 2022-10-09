import "./App.css";
import CoinsTableM from "./table/CoinsTableM";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headerline from "./table/Header";
import CoinInfo from "./CoinInfo";
import { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [selectedCoinID, setSelectedCoinID] = useState(null);

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <Headerline />
      <Routes>
        <Route
          path={`/:${selectedCoinID}`}
          element={
            <CoinInfo selectedCoinID={selectedCoinID}/>
          }
        />
        <Route
          path="/"
          element={<CoinsTableM selectCoinID={setSelectedCoinID} />}
        ></Route>
      </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
