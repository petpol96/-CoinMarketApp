import "./App.css";
import CoinsTableM from "./table/CoinsTableM";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Headerline from "./table/Header";
import CoinInfo from "./CoinInfo";
import { useRef, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [selectedCoinID, setSelectedCoinID] = useState(null);
  const ref = useRef(null);

  const handleRef = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log("clicked");
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Headerline />
      <div ref={ref}>
        <CoinInfo selectedCoinID={selectedCoinID} />
      </div>
      <CoinsTableM selectCoinID={setSelectedCoinID} handleRef={handleRef} />
    </ThemeProvider>
  );
}

export default App;
