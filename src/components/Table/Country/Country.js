import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const FEATCH_COUNTRY_QUERY = gql`
  query($code: String!) {
    country(code: $code) {
      code
      name
      native
      emoji
      currency
      phone
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function Country(props) {
  const classes = useStyles();

  const countryCode = props.match.params.countryCode;
  console.log("countryCode", countryCode);
  const { loading, error, data } = useQuery(FEATCH_COUNTRY_QUERY, {
    variables: { code: countryCode }
  });
  if (loading) return <p>Loading ...</p>;
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Country Code: {data.country.code}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>Name: {data.country.name}</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              Native: {data.country.native}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>Emoji: {data.country.emoji}</Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              Currency: {data.country.currency}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>Phone: {data.country.phone}</Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Country;
