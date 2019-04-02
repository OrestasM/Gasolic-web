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
    backgroundColor: "rgba(255,255,255,0.9)", 
  },
  error: {
    color: "#DE0230",
    fontSize : 12
  },
  button: {
    backgroundColor: "#505050",
    marginTop:30,
    color: "white"
  },
  text: {
    color: "white"
  }
});

class Decoder extends Component {

    state = {
      ibus:"",
      name:"",
      decoded:"",
    }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

   copyToClipboard = (text) =>{
     console.log(text);
      var dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.setAttribute('value', text);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("Coppied text: " + text);
  }

   copyStringToClipboard = (str) => {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }

  decode = (name, ibus) =>{
    if(name.toString() != "" && ibus.toString() != ""){
      let decodedName = name
                        .toString()
                          .toUpperCase()
                            .trimStart()
                              .trimEnd()
                                .replace(/ /g, "_");
      let size = ibus
        .toString()
          .trimEnd()
            .trimStart()
              .split(" ")
                .length;

      let decoded = ibus
        .toString()
          .toUpperCase()
            .trimStart()
              .trimEnd()
                .replace(/ /g, " , 0x");

      decoded = "const byte " + decodedName + " [" + size +  "] PROGMEM = {  \n 0x" + decoded + " };";

      //this.copyToClipboard(decoded);
      this.copyStringToClipboard(decoded);
      this.setState({
        decoded: decoded
      })


    }else{
      this.setState({
        decoded: "ERROR! Not all fields are filled!"
      })
    }
      
  }

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
              <Typography>Decoder</Typography>

              <TextField
                id="name"
                label="Name"
                type="name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />

              <TextField
                id="ibus"
                label="K/I-Bus message"
                className={classes.textField}
                value={this.state.ibus}
                onChange={this.handleChange("ibus")}
                margin="normal"
              />

              <TextField
                id="outlined-full-width"
                label="Decoded message"
                className={classes.textField}
                value={this.state.decoded}
                fullWidth
                multiline
                margin="normal"
              />
              
              <Button variant="contained" className={classes.button} onClick={()=> this.decode(this.state.name, this.state.ibus)}>Decode!</Button>
            </Grid>
          </CardContent>
        </Card>        
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(Decoder);