import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { TableFooter, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate} from "react-router-dom";

export default function CoinsTableM(props) {
  const [coins, setCoins] = useState(null);
  const [page, setPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/coins/market/${coinsPerPage}/${page}`, {
        headers: {},
      })
      .then((res) => {
        setCoins(res.data);
      });
  }, [page, coinsPerPage]);

  const colorPicker = (value) => {
    return value > 0 ? "#4BB543" : "#FF9494";
  };
  const handleCoinsChange = (event) => {
    setCoinsPerPage(event.target.value);
    
  };
  const HandleRowClick=(id)=>{
    props.selectCoinID(id)
    navigate('/'+id)
  }
  const displayCoins = () => {
    return coins != null ? (
      coins.markets.map((row) => (
        <TableRow
          className="tableRow"
          onClick={()=>HandleRowClick(row.id)}
          key={row.name}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell className="tableCell" component="th" scope="row">
            <img
              src={row.image}
              _
              style={{ width: "35px", height: "35px", display: "inline-block" }}
            ></img>
            <div style={{ marginLeft: "10px", display: "inline-block" }}>
              <Typography>{row.name}</Typography>
              <Typography>${row.symbol}</Typography>
            </div>
          </TableCell>
          <TableCell className="tableCell" align="center">
            ${row.current_price}
          </TableCell>
          <TableCell className="tableCell" align="center">
            {row.high_24h}
          </TableCell>
          <TableCell className="tableCell" align="center">
            {row.low_24h}
          </TableCell>
          <TableCell
            align="center"
            sx={{ color: colorPicker(row.price_change_percentage_24h) }}
          >
            {row.price_change_percentage_24h}%
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow></TableRow>
    );
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "1700px", width: "90%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell>Coins</TableCell>
                <TableCell align="center">Current Price</TableCell>
                <TableCell align="center">High Price 24h</TableCell>
                <TableCell align="center">Low Price 24h</TableCell>
                <TableCell align="center">Price Change 24h</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayCoins()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <TableFooter sx={{ width: "100vw" }}>
        <TableRow
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
          }}
        >
          {" "}
          <span style={{ fontSize: "15px", textAlign: "center" }}>
            Coins per Page
          </span>
          <FormControl sx={{ m: 1, minWidth: "60px" }}>
            <Select
              value={coinsPerPage}
              onChange={handleCoinsChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <ArrowBackIosRoundedIcon
            onClick={() => (page > 1 ? setPage(page - 1) : null)}
            sx={{ cursor: "pointer" }}
          />
          <span style={{ fontSize: "20px" }}>{page}</span>
          <ArrowForwardIosRoundedIcon
            onClick={() => setPage(page + 1)}
            sx={{ cursor: "pointer" }}
          />
        </TableRow>
      </TableFooter>
    </div>
  );
}
