import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navbar: {
    backgroundColor: '#303030'
  },
  text: {
    'text-decoration': 'none'
  },
  label: {
    float: 'right',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
};
class Navbar extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { classes, auth } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.navbar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.text} component={Link} to="/home">
             Gasolic
            </Typography>
            <div className={classes.toolbarButtons}>
              { auth.isAuthenticated
                ? (
                  <div>
                    <Button component={Link} to="/addcar" color="inherit">Add car</Button>
                    <Button component={Link} to="/home" color="inherit">Home</Button>
                    <Button onClick={e => this.onLogoutClick(e)} className={classes.label && classes.text} color="inherit">Log Out</Button>
                  </div>
                )
                : (
                  <div>
                    <Button color="inherit" component={Link} className={classes.label && classes.text} to="/login">Login</Button>
                    <Button color="inherit" component={Link} className={classes.label && classes.text} to="/register">Register</Button>


                  </div>
                )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(connect(
  mapStateToProps,
  { logoutUser }
)(Navbar));
