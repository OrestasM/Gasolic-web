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
    card: {
      maxWidth: 700,
      textAlign: "center",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "rgba(150,150,150,0.6)", 
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
        margin: "auto",
        marginBottom: 30
    },
    licensePlate: {
        backgroundColor:"white",
        margin: "auto",
        width: "auto"
    },
    button: {
        backgroundColor: "#505050",
        color: "white",
        margin: "auto",
        marginTop: 20,
        width: "100%"
      },
    addButton: {
        backgroundColor: "#505050",
        color: "white",
        margin: 20,
    },
  });
class AllConsumptions extends Component {
    state = {
        open: false,
        consumptions: [],
        cars:[],
        errors: {},
        year:"",
        licensePlate:'',
        engine:0,
        mileage:"",
        make:'',
        model:'',
        selectedMake:"Select make",
        selectedModel:"Select model",
        loading: false,
        noData: false
     }

    componentDidMount() {
        this.setState({loading:true})
            axios
                .get("/api/car/get/single/"+this.props.location.state.carId)
                .then((response) => { 
                    this.setState({
                        make: response.data[0].make,
                        model: response.data[0].model,
                        licensePlate: response.data[0].licensePlate,
                    })
                    axios
                        .get("/api/consumptions/get/"+this.props.location.state.carId)
                        .then((response) => { 
                            if(response.data.length===0){
                                this.setState({
                                    noData:true,
                                    loading:false
                                })
                            }else{
                                this.setState({
                                    loading: false,
                                    consumptions: response.data
                                 })
                            }
                            
                        })
                        .catch(err => console.log(err))
        
                })
                .catch(err => console.log(err))
        
        
    }

    isEmpty =(obj)=> {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleDelete=(id)=>{
        
        axios
            .delete("/api/consumptions/"+id)
            .then(res=>{
                axios
                    .get("/api/consumptions/get/"+this.props.location.state.carId)
                    .then((response) => { 
                        if(response.data.length===0){
                            this.setState({
                                noData:true,
                                loading:false
                            })
                        }else{
                            this.setState({
                                loading: false,
                                consumptions: response.data
                                })
                        }
                        
                    })
                    .catch(err => console.log(err))
            })
            .catch(err=>{
                console.log(err)
                this.setState({loading:false})
            })
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
                        {this.state.noData
                        ?
                        <div>
                            <Typography variant="headline" className={classes.text}>{this.state.make + " " + this.state.model}</Typography>
                            <Typography variant="headline" className={classes.text}>No data! Add consumptions</Typography>
                        </div>
                        :
                            <div>
                                <Typography variant="headline" className={classes.text}>{this.state.make + " " + this.state.model}</Typography>
                                {!this.state.loading
                                ?   <div>
                                        <Grid
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            {this.state.consumptions.map((item, index)=>{
                                                return(
                                                        <Card key={index+10} className={classes.cardChild}>
                                                            <Typography>Fuel used: {item.fuelUsed}</Typography>
                                                            <Typography>Mileage: {item.mileage}</Typography>
                                                            <Typography>Price: {item.price}</Typography>
                                                            <Typography>Trip: {item.trip}</Typography>
                                                            <Grid
                                                                container
                                                                direction="column"
                                                                justify="center"
                                                                alignItems="center"
                                                            >
                                                                <Button 
                                                                    variant="contained" 
                                                                    className={classes.button} 
                                                                    onClick={()=>this.handleDelete(item._id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button 
                                                                    variant="contained" 
                                                                    className={classes.button} 
                                                                    component={Link}
                                                                    to={{ pathname: '/editconsumption', state: {
                                                                        _id:item._id,
                                                                        car:item.car,
                                                                        fuelUsed:item.fuelUsed,
                                                                        mileage:item.mileage,
                                                                        price:item.price,
                                                                        trip:item.trip
                                                                    } }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                        </Card>
                                                )
                                            })}
                                        </Grid>
                                    </div>
                                :
                                    <Typography variant="headline" className={classes.text}>Loading</Typography>
                                }
                                    </div>
                                }
                        
                        
                        <Grid item>
                            <Fab 
                                aria-label="Add" 
                                className={classes.addButton} 
                                component={Link} 
                                to={{ pathname: '/addconsumptions', state: { carId: this.props.location.state.carId} }}
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

AllConsumptions.propTypes = {
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
)(AllConsumptions));