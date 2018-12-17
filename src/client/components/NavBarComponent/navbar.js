import React, { Component } from 'react';
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
import { logoutUser } from "../../actions/authActions";
import { connect } from 'react-redux';

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
//   class Navbar extends React.Component {
//     onLogoutClick = e => {
//       e.preventDefault();
//       this.props.logoutUser();
//     };

//   render() {
//     const { classes } = props;
//   const { user } = this.props.auth;
//   return (
//     <div className={classes.root}>
//       <AppBar position="absolute" className={classes.navbar}>
//         <Toolbar>
//           <Typography variant="h6" color="inherit" className={classes.text}>
//             Gasolic
//           </Typography>
//           <div className={classes.toolbarButtons}>
//             {/* <Button color="inherit" component={Link} to="/login" className={classes.label && classes.text}>Login</Button>
//             <Button color="inherit" component={Link} to="/register" className={classes.label && classes.text}>Register</Button>
//  */}


//             {/* { this.props.auth.isAuthenticated ?
//               <div>
//                 <Button onClick={(e)=>this.onLogoutClick(e)} className={classes.label && classes.text} color="inherit">Log Out</Button>
//               </div>
//               :
//               <div>
//                 <Button color="inherit" component={Link} className={classes.label && classes.text} to="/login">Login</Button>
//                 <Button color="inherit" component={Link} className={classes.label && classes.text} to="/register">Register</Button>
//               </div>
//             } */}

//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
//   }
  
// }

// Navbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default withStyles(styles)(connect(
//   mapStateToProps,
//   { logoutUser }
// )(Navbar));



class Navbar extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render(){
    const { classes } = this.props;
    const { user } = this.props.auth;
    return (
      // <div className={classes.root}>
      //   <AppBar position="static">
      //     <Toolbar>
      //       <Typography variant="h6" color="inherit" className={classes.grow}>
      //         Enviromental Issues Tracker
      //       </Typography>
      //       { this.props.auth.isAuthenticated ?
      //         <div>
      //           <Button className={classes.label && classes.text} onClick={(e)=>this.onLogoutClick(e)} color="inherit">Log Out</Button>
      //         </div>
      //         :
      //         <div>
      //           <Button className={classes.label && classes.text} color="inherit" component={Link} to="/login">Login</Button>
      //           <Button className={classes.label && classes.text} color="inherit" component={Link} to="/register">Register</Button>
      //         </div>
      //       }
            
      //     </Toolbar>
      //   </AppBar>
      // </div>
      <div className={classes.root}>
       <AppBar position="absolute" className={classes.navbar}>
         <Toolbar>
           <Typography variant="h6" color="inherit" className={classes.text}>
             Gasolic
           </Typography>
           <div className={classes.toolbarButtons}>
             { this.props.auth.isAuthenticated ?
               <div>
                 <Button onClick={(e)=>this.onLogoutClick(e)} className={classes.label && classes.text} color="inherit">Log Out</Button>
               </div>
               :
               <div>
                 <Button color="inherit" component={Link} className={classes.label && classes.text} to="/login">Login</Button>
                 <Button color="inherit" component={Link} className={classes.label && classes.text} to="/register">Register</Button>
               </div>
             }
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