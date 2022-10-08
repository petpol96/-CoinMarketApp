import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CoinInfo(props) {
  const [coin, setCoin] = useState(null);
  useEffect(() => {
    if (props.selectedCoinID) {
      axios
        .get(`http://localhost:3000/api/v1/coins/${props.selectedCoinID}`, {
          headers: {},
        })
        .then((res) => {
          setCoin(res.data);
        });
    }
  }, [props.selectedCoinID]);

  const coinDetails = () => {
    
    if (coin) {
        console.log(props.sref)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Paper
            elevation={2}
            sx={{ maxWidth: "1700px", width: "90%", minHeight: "200px" }}
          >
            <Typography variant="h4" sx={{display:'inline-block',marginLeft:'10px'}}>{coin.name}</Typography>
            <Typography variant="h5" sx={{display:'inline-block',marginLeft:'5px',opacity:0.5}}>${coin.symbol}</Typography>
          </Paper>
        </div>
      );
    }
  };

  return coinDetails();
}
