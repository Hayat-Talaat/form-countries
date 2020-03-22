import React from "react";
import { Link } from "react-router-dom";

import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles
} from "@material-ui/core";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    // width: 250,
    margin: "auto",
    textAlign: "center"
  }
});

export default function SimpleTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  if (loading) return <p>Loading ...</p>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Native</TableCell>
            <TableCell align="center">Emoji</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.countries.map(
            ({ code, name, native, phone, currency, emoji }) => (
              <TableRow key={code}>
                <TableCell component="th" scope="row" align="center">
                  {code}
                </TableCell>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{native}</TableCell>
                <TableCell align="center">{emoji}</TableCell>
                <TableCell
                  component={Link}
                  to={`/country/${code}`}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
      native
      emoji
    }
  }
`;
