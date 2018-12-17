import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

const styles = theme => ({
  container: {
    textAlign: "center",
    margin: "auto",
    opacity: "0.95",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: "white"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  card: {
    maxWidth: 400,
    textAlign: "center",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)", 
  },
  error: {
    color: "#DE0230",
    fontSize : 12
  },
  button: {
    backgroundColor: "#505050",
  },
  text: {
    color: "white"
  }
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };


    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/home");
      }
    }


  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home"); 
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
        email: this.state.email,
        password: this.state.password
      };
    this.props.loginUser(userData); 
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.main}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {/* <Typography className={classes.text}>Sign In</Typography> */}

              <TextField
                id="email"
                label="Email"
                className={classes.textField && classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <span className={classes.error}>
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              <TextField
                id="password"
                label="Password"
                type="password"
                className={classes.textField && classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
              />
              <span className={classes.error}>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>

              <Button color="primary" variant="contained" className={classes.button} onClick={(e)=> this.onSubmit(e)}>Sign In</Button>
            </Grid>
          </CardContent>
        </Card>        
      </div>
      </div>
    );
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default withStyles(styles)(connect(
  mapStateToProps,
  { loginUser }
)(Login));