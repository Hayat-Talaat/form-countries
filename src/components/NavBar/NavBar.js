import React from 'react';
import {Button, Toolbar, AppBar, makeStyles} from '@material-ui/core/'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 100
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Button component={Link} to="/" className={classes.title} color="inherit">Countries</Button>
          <Button component={Link} to="/form" className={classes.title} color="inherit">Login</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
