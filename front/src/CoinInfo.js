import { Paper, Typography } from "@mui/material";
import { grid } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
  const colorPicker = (value) => {
    return value > 0 ? "#4BB543" : "#FF9494";
  };
  const coinDetails = () => {
    if (coin) {
      return (
        <div sx={{ display: grid }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              gridColumn: 1,
            }}
          >
            <Paper
              elevation={2}
              sx={{ maxWidth: "1700px", width: "90%", minHeight: "200px" }}
            >
              <Typography
                variant="h4"
                sx={{
                  display: "inline-block",
                  marginLeft: "50px",
                  marginTop: "20px",
                }}
              >
                {coin.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  opacity: 0.5,
                }}
              >
                ${coin.symbol}
              </Typography>
              <Typography variant="h5" sx={{ marginLeft: "50px" }}>
                Current price {coin.current_price}$
              </Typography>
              <div>
                <Typography
                  sx={{ display: "inline-block", marginLeft: "50px" }}
                >
                  Highest Price last 24H:
                </Typography>
                <Typography sx={{ display: "inline-block", color: "#4BB543" }}>
                  {" "}
                  {coin.high_24h}$
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                  className='sameLine'
                >
                  Lowest Price last 24H:
                </Typography>
                <Typography sx={{ display: "inline-block", color: "#FF9494" }}>
                  {" "}
                  {coin.low_24h}$
                </Typography>
              </div>
              <Typography
                variant="h5"
                sx={{ marginLeft: "50px", marginTop: "10px" }}
              >
                Price Change
              </Typography>
              <TableContainer component={Paper} sx={{ width:'80%',maxWidth:'1200px',marginLeft:'50px',marginTop:'10px'}}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>24h</TableCell>
                      <TableCell>7d</TableCell>
                      <TableCell>14d</TableCell>
                      <TableCell>30d</TableCell>
                      <TableCell>60d</TableCell>
                      <TableCell>200d</TableCell>
                      <TableCell>1y</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_24h)}}>{coin.price_change_percentage_24h}%</TableCell>
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_7d)}}>{coin.price_change_percentage_7d}%</TableCell>
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_14d)}}>{coin.price_change_percentage_14d}%</TableCell>
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_30d)}}>{coin.price_change_percentage_30d}%</TableCell>
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_60d)}}>{coin.price_change_percentage_60d}%</TableCell>
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_200d)}}>{coin.price_change_percentage_200d}%</TableCell>
                        <TableCell sx={{color:colorPicker(coin.price_change_percentage_1y)}}>{coin.price_change_percentage_1y}%</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography
                variant="h5"
                sx={{ marginLeft: "50px", marginTop: "10px" }}
              >
                Description
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "20px",
                  marginLeft: "50px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    textAlign: " justify",
                    textJustify: "inter-word",
                    width: "95%",
                  }}
                  dangerouslySetInnerHTML={{ __html: coin.description }}
                />
              </Typography>
            </Paper>
          </div>
        </div>
      );
    }
  };

  return coinDetails();
}
