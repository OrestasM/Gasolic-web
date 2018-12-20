import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from 'react-redux';
import { addConsumption } from "../../actions/carActions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classnames from "classnames";
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';

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
      maxWidth: 700,
      textAlign: "center",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.95)", 
    },
    error: {
      color: "#DE0230",
      fontSize : 12
    },
    button: {
      backgroundColor: "#505050",
    },
    text: {
      color: "rgba(220,220,220,1)",
      padding: 20
    },
    cardChild: {
        width: "70%",
        textAlign: "center",
        padding: 30,
        justifyContent: "center",
        backgroundColor: "rgba(220,220,220,1)", 
        marginBottom: 30
    },
    licensePlate: {
        backgroundColor:"white",
        margin: "auto",
        width: "20%"
    },
    button: {
        backgroundColor: "#505050",
        color: "white",
        margin: 20,
      },
      addCar:{
          width:"70%",
          margin: 30
      },
      select:{
          marginTop: 20,
      }
  });
class AddConsumption extends Component {
    state = {
        errors:{},
        mileage:"",
        price:"",
        fuelUsed:0,
        trip:"",
        price:0,
     }

    componentDidMount() {
     
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }


    onConfirm=()=> {
        let newConsumption = {
            car:this.props.location.state.carId,
            mileage:this.state.mileage,
            trip:this.state.trip,
            fuelUsed:this.state.fuelUsed,
            price:this.state.price,
        }
        console.log(newConsumption)
        this.props.addConsumption(newConsumption, this.props.history);     
    }

    cancel=()=>{
        this.props.history.push("/home")
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    render() { 
        const { classes } = this.props;
        const { errors } = this.state;
        return ( 
            <div>
                <Card className={classes.card}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{marginBottom: 30}}
                    >
                        <div className={classes.addCar}>
                        <TextField
                            margin="dense"
                            id="mileage"
                            label="Mileage"
                            type="mileage"
                            fullWidth
                            onChange={this.handleChange.bind(this)} 
                            className={classnames("", {
                                invalid: errors.mileage
                                })}
                        />
                        <span className={classes.error}>
                            {errors.mileage}
                        </span>

                        <TextField
                            margin="dense"
                            id="trip"
                            label="Trip"
                            type="trip"
                            fullWidth
                            onChange={this.handleChange.bind(this)} 
                            className={classnames("", {
                                invalid: errors.trip
                                })}
                        />
                        <span className={classes.error}>
                            {errors.trip}
                        </span>

                        <Grid item className={classes.select}>
                            <TextField
                                style={{width:"100%", margin: "auto"}}
                                label="Fuel used"
                                id="fuelUsed"
                                name="fuelUsed"
                                onChange={this.handleChange.bind(this)}
                                className={classnames(classes.margin, classes.textField, {
                                    invalid: errors.fuelUsed
                                })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Liters</InputAdornment>,
                                }}
                            />
                            <Grid item>
                                <span className={classes.error}>
                                    {errors.fuelUsed}
                                </span>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.select}>           
                            <TextField
                                style={{width:"100%", margin: "auto"}}
                                label="Price per liter"
                                id="price"
                                name="price"
                                onChange={this.handleChange.bind(this)} 
                                className={classnames(classes.margin, classes.textField, {
                                    invalid: errors.price
                                })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }}
                            />
                            <Grid item>
                                <span className={classes.error}>
                                    {errors.price}
                                </span>
                            </Grid>
                        </Grid>
                        </div>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={16}
                        >
                            <Grid item>
                                <Button className={classes.button} variant="contained" onClick={this.cancel}>Cancel</Button>  
                            </Grid>
                            <Grid item>
                            <Button className={classes.button} variant="contained" onClick={this.onConfirm}>Confirm</Button>
                            </Grid>
                        </Grid> 
                    </Grid>
                </Card>
            </div>
         );
    }
}

AddConsumption.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors

});
  
export default withStyles(styles)(connect(
mapStateToProps,
{addConsumption}
)(AddConsumption));