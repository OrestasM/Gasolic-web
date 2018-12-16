import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Link,
  withRouter
} from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navbar:{
      backgroundColor: "#303030"
  },
  text:{
    // "font-family": "Montserrat",
  },
  label:{
    "float":"right",
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.text}>
            Gasolic
          </Typography>
          <div className={classes.toolbarButtons}>
            <Button color="inherit" component={Link} to="/login" className={classes.label && classes.text}>Login</Button>
            <Button color="inherit" component={Link} to="/register" className={classes.label && classes.text}>Register</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navbar));