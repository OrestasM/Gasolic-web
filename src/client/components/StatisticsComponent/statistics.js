import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from 'react-redux';
import { addCar } from "../../actions/carActions";
import {Line} from 'react-chartjs-2';
import moment from 'moment';
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
      paddingBottom: 30,
      display: "flex",
      justifyContent: "center",
      backgroundColor: "rgba(150,150,150,0.6)", 
    },
    data: {
        minWidth: 500,
        textAlign: "center",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        marginBottom:30
    },
    chart:{
        minWidth: "100%",
        minHeight: "100%",
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
        width: "auto"
    },
    button: {
        backgroundColor: "#505050",
        color: "white",
        margin: 20,
      },
      addButton: {
        backgroundColor: "#505050",
        color: "white",
        margin: 20,
    },
  });
class Statistics extends Component {
    state = {
        consumptions: [],
        labels: [],
        price: [],
        loading: false,
        noData: false,
        make:"",
        model:"",
        licensePlate:""
     }

    isEmpty =(obj)=> {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentWillMount=()=> {
        this.setState({loading:true})
        axios
            .get("http://localhost:8080/api/consumptions/get/"+this.props.location.state.carId)
            .then(res => {
                if(this.isEmpty(res.data)){
                    this.setState({noData:true})
                }else{
                    this.setState({
                        consumptions: res.data
                    })
                    this.constructData();
                } 
            })
            .catch(err => {
                console.log(err)   
            })

        axios
            .get("http://localhost:8080/api/car/get/single/"+this.props.location.state.carId)
            .then(res =>{
                this.setState({
                    make:res.data[0].make,
                    model:res.data[0].model,
                    licensePlate: res.data[0].licensePlate
                })
                
            })
            .catch(err=>console.log(err))
    }

    constructData = () =>{
        let labels = []
        let consumptions = [];
        let price = [];
        this.state.consumptions.forEach(item=>{
            let label = moment(item.date.toString()).format("MM-DD");
            labels.push(label)
            let consumption = (item.fuelUsed/item.trip*100).toFixed(2);
            consumptions.push(consumption);
            let singlePrice = item.price.toFixed(2);
            price.push(singlePrice);
        })
        this.setState({labels,consumptions,price},this.setState({loading:false})) 
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    render() { 
        const { classes } = this.props;
        const { consumptions } = this.state;
        const consumptionData = {
            labels: this.state.labels,
            datasets: [
              {
                label: 'liters / 100 km',
                fill: true,
                lineTension: 0.2,
                backgroundColor: 'rgba(200,200,200,0.4)',
                borderColor: 'rgba(150,150,150,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(90,90,90,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(200,200,200,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.consumptions
              }
            ]
          };
        const priceData = {
            labels: this.state.labels,
            datasets: [
              {
                label: '€ per liter',
                fill: true,
                lineTension: 0.2,
                backgroundColor: 'rgba(200,200,200,0.4)',
                borderColor: 'rgba(150,150,150,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(90,90,90,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(200,200,200,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.price
              }
            ]
          };
        return ( 
            <div>
                <Card className={classes.card}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        {this.state.loading || this.state.noData
                        ?
                            <div>
                                {
                                    this.state.noData
                                    ?
                                    <div>
                                        <Typography variant="headline" className={classes.text}>{this.state.make+" "+this.state.model+" "+this.state.licensePlate}</Typography>
                                        <Typography className={classes.text} variant="h4">No data! Add consumptions</Typography>
                                    </div>
                                    :
                                    <div>
                                        <Typography className={classes.text} variant="h4">Loading</Typography>
                                    </div>
                                }
                            </div>
                        :
                        <div>
                            <Typography variant="headline" className={classes.text}>{this.state.make+" "+this.state.model+" "+this.state.licensePlate}</Typography>
                            <Card className={classes.data}>
                                <Line data={consumptionData} />
                            </Card>
                            <Card className={classes.data}>
                                <Line data={priceData} />
                            </Card>
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

Statistics.propTypes = {
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
)(Statistics));