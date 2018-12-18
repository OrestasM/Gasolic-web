import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from 'react-redux';
import { addCar } from "../../actions/carActions";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import classnames from "classnames";

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
      backgroundColor: "rgba(150,150,150,0.6)", 
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
        maxWidth: 400,
        textAlign: "center",
        padding: 30,
        justifyContent: "center",
        backgroundColor: "rgba(220,220,220,1)", 
        marginBottom: 30
    },
    licensePlate: {
        backgroundColor:"white"
    }
  });
class Home extends Component {
    state = {
        open: false,
        cars:[],
        errors: {},
        make: "",
        model: "",
        year:"",
        licensePlate:0,
        engine:0,
        mileage:""
     }

    componentDidMount() {
        if(this.props.auth.user.id!==undefined){
            axios.get("http://localhost:8080/api/car/get/"+this.props.auth.user.id)
            // axios.get("http://localhost:8080/api/car/get/"+"5c15c1e809d07b2568a7f087")
                .then((response) => { 
                    this.setState({
                        cars: response.data
                    })
                })
                .catch(err => console.log(err))
        }
        
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
          };
        this.props.loginUser(userData); 
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    onConfirm=()=> {
        console.log("Veikia")
        // axios.post('http://localhost:5000/todo/add', {
        //         make:this.state.make,
        //         model:this.state.model,
        //         year:this.state.year,
        //         licensePlate:this.state.licensePlate,
        //         engine:this.state.engine,
        //         owner:this.props.auth.user.id,
        //         currentMileage:this.state.mileage
        //     })
        //     .then(() => {
        //         axios.get("http://localhost:8080/api/car/get/"+"5c15c1e809d07b2568a7f087")
        //         .then((response) => { 
        //             this.setState({
        //                 cars: response.data
        //             })
        //             this.handleClose();
        //         })
        //         .catch(err => console.log(err))
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        let newCar = {
            make:this.state.make,
            model:this.state.model,
            year:this.state.year,
            licensePlate:this.state.licensePlate,
            engine:this.state.engine,
            owner:"5c15c1e809d07b2568a7f087",
            currentMileage:this.state.mileage
        }
        this.props.addCar(newCar);
        if(!this.state.errors){
            this.handleClose();
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

    render() { 
        const { classes } = this.props;
        const { user } = this.props.auth;
        const { errors } = this.state;
        // console.log(this.state.make)
        // console.log(this.state.model)
        // console.log(this.state.year)
        // console.log(this.state.licensePlate)
        // console.log(this.state.mileage)
        // console.log(this.state.engine)
        console.log(errors)
        return ( 
            <div>
                <Card className={classes.card}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="headline" className={classes.text}>Your cars</Typography>
                        {this.state.cars.map((item, index)=>{
                            return(
                                <Card className={classes.cardChild} key={index+5}>
                                    <Typography variant="h4">{item.make}</Typography>
                                    <Typography variant="h6">{item.model}</Typography>
                                    <Typography variant="h6" className={classes.licensePlate}>{item.licensePlate}</Typography>
                                </Card>
                            )
                        })}
                        <Grid item>
                            <Fab 
                                color="primary" 
                                aria-label="Add" 
                                className={classes.fab} 
                                onClick={this.handleClickOpen}
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Add new car</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="make"
                                    label="Make"
                                    type="make"
                                    fullWidth
                                    value={this.state.make}
                                    onChange={this.handleChange.bind(this)} 
                                    className={classnames("", {
                                        invalid: errors.make
                                      })}
                                />
                                <span className={classes.error}>
                                    {errors.make}
                                </span>
                                <TextField
                                    margin="dense"
                                    id="model"
                                    label="Model"
                                    type="model"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)} 
                                    className={classnames("", {
                                        invalid: errors.model
                                      })}
                                />
                                <span className={classes.error}>
                                    {errors.model}
                                </span>
                                 <TextField
                                    margin="dense"
                                    id="year"
                                    label="Year"
                                    type="year"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)} 
                                    className={classnames("", {
                                        invalid: errors.year
                                      })}
                                />
                                <span className={classes.error}>
                                    {errors.year}
                                </span>
                                <TextField
                                    margin="dense"
                                    id="mileage"
                                    label="Current mileage"
                                    type="mileage"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                    className={classnames("", {
                                        invalid: errors.currentMileage
                                      })}
                                />
                                <span className={classes.error}>
                                    {errors.currentMileage}
                                </span>
                                <TextField
                                    margin="dense"
                                    id="licensePlate"
                                    label="License Plate"
                                    type="licensePlate"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)} 
                                />
                                 <TextField
                                    margin="dense"
                                    id="engine"
                                    label="Engine capacity"
                                    type="engine"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)} 
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={this.handleClose} 
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={this.onConfirm} 
                                    color="primary"
                                >
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Card>
            </div>
         );
    }
}

Home.propTypes = {
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
{addCar}
)(Home));