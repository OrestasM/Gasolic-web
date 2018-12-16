import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  container: {
    textAlign: "center",
    margin: "auto",
    opacity: "0.95"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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
    justifyContent: "center"
  },
  error: {
    color: "#DE0230",
    fontSize : 12
  },
  button: {
    backgroundColor: "#505050",
  },
});

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/issuemap");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.confirmPassword
    };
    this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography>Sign Up</Typography>
              <TextField
                id="first-name"
                label="Username"
                className={classes.textField && classnames("", {
                  invalid: errors.name
                })}
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
              />
              <span className={classes.error}>{errors.name}</span>
              <TextField
                id="email"
                label="Email"
                className={classes.textField && classnames("", {
                  invalid: errors.email
                })}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <span className={classes.error}>{errors.email}</span>
              <TextField
                id="password"
                label="Password"
                type="password"
                className={classes.textField && classnames("", {
                  invalid: errors.password
                })}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
              />
              <span className={classes.error}>{errors.password}</span>
              <TextField
                id="password-confirm"
                label="Password Confirm"
                type="password"
                className={classes.textField && classnames("", {
                  invalid: errors.password2
                })}
                value={this.state.confirmPassword}
                onChange={this.handleChange("confirmPassword")}
                margin="normal"
              />
              <span className={classes.error}>{errors.password2}</span>

              <Button color="primary" variant="contained" className={classes.button} onClick={(e)=> this.onSubmit(e)} >Sign Up</Button>

            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(
  connect(mapStateToProps, { registerUser })(withRouter(Register))
)
// export default withStyles(styles)(Register);