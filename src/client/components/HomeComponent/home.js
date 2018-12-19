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
import Button from '@material-ui/core/Button';
import {
    Link,
    withRouter
  } from 'react-router-dom'

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
  });
class Home extends Component {
    state = {
        open: false,
        cars:[],
        errors: {},
        year:"",
        licensePlate:0,
        engine:0,
        mileage:"",
        make:{Makes:[]},
        model:{Models:[]},
        selectedMake:"Select make",
        selectedModel:"Select model"
     }

    componentDidMount() {
        if(this.props.auth.user.id!==undefined){
            axios.get("http://localhost:8080/api/car/get/"+this.props.auth.user.id)
                .then((response) => { 
                    this.setState({
                        cars: response.data
                    })
                })
                .catch(err => console.log(err))
        }
        
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    render() { 
        const { classes } = this.props;
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
                                    <Typography variant="h6">{item.year}</Typography>
                                    <Typography variant="h6" className={classes.licensePlate}>{item.licensePlate}</Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={16}
                                    >
                                        <Grid item>
                                            <Button variant="contained" className={classes.button}>Add consumptions</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" className={classes.button}>View statistics</Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        })}
                        <Grid item>
                            <Fab 
                                aria-label="Add" 
                                className={classes.button} 
                                onClick={this.handleClickOpen}
                                component={Link}
                                to="/addcar"
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>                          
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