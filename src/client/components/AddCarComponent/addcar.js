import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from 'react-redux';
import { addCar } from "../../actions/carActions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classnames from "classnames";
import Select from '@material-ui/core/Select';

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
class AddCar extends Component {
    state = {
        open: false,
        cars:[],
        errors: {},
        year:"",
        loading: false,
        licensePlate:0,
        engine:0,
        mileage:"",
        make:{Makes:[]},
        model:{Models:[]},
        selectedMake:"Select make",
        selectedModel:"Select model",
        test: false
     }

    componentDidMount() {
        axios.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes")
            .then(response=>{
                this.setState({model:{Models:[]}})
                let make = response.data;
                make = make.replace("?","");
                make = make.replace("(","");
                make = make.replace(")","")
                make = make.replace(";","")
                make = JSON.parse(make);
                this.setState({
                    make,
                    loading: true
                
                })
                axios.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=abarth")
                    .then(response=>{
                        let model = response.data;
                        model = model.replace("?","");
                        model = model.replace("(","");
                        model = model.replace(")","")
                        model = model.replace(";","")
                        model = JSON.parse(model);
                        this.setState({
                            model,
                            loading: false
                        })
                    })
            })
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleMakeChange=(e)=>{
        this.setState({loading: true})
        axios.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make="+e.target.value)
            .then(response=>{
                this.setState({})
                let model = response.data;
                model = model.replace("?","");
                model = model.replace("(","");
                model = model.replace(")","")
                model = model.replace(";","")
                model = JSON.parse(model);
                this.setState({
                    model,
                    loading: false
                })
                
            })
            this.setState({[e.target.id]: e.target.value});
        
    }

    onConfirm=()=> {
        let newCar = {
            make:this.state.selectedMake,
            model:this.state.selectedModel,
            year:this.state.year,
            licensePlate:this.state.licensePlate,
            engine:this.state.engine,
            owner:this.props.auth.user.id,
            currentMileage:this.state.mileage
        }
        this.props.addCar(newCar, this.props.history);     
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
        const { errors, test } = this.state;
        return ( 
            <div>
                <Card className={classes.card}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                            <div className={classes.addCar}>
                                <div className={classes.select}>                 
                                    <Select
                                        margin="dense"
                                        native
                                        fullWidth
                                        onChange={(e)=>this.handleMakeChange(e)}
                                        value={this.state.selectedMake}
                                        id="selectedMake"
                                        className={classnames("", {
                                            invalid: errors.make
                                        }) && classes.select}
                                    >
                                        {this.state.make.Makes.map((item, index) =>{
                                            return <option key={index+10} value={item.make_display}>{item.make_display}</option>
                                        })}
                                    </Select>
                                    <span className={classes.error}>
                                        {errors.make}
                                    </span>

                                    {this.state.loading ?
                                             <div>
                                                <Select
                                                        margin="dense"
                                                        native
                                                        fullWidth
                                                        disabled
                                                        onChange={(e)=>this.handleChange(e)}
                                                        value={this.state.selectedModel}
                                                        id="selectedModel"
                                                        className={classnames("", {
                                                            invalid: errors.model
                                                        })}
                                                    >{this.state.model.Models.map((item, index) =>{
                                                        return <option key={index+10} value={item.model_name}>{item.model_name}</option>
                                                    })}
                                                </Select>
                                                <span className={classes.error}>
                                                    {errors.model}
                                                </span>
                                            </div> 
                                             :
                                             <div>
                                             <Select
                                                    margin="dense"
                                                    native
                                                    fullWidth
                                                    onChange={(e)=>this.handleChange(e)}
                                                    value={this.state.selectedModel}
                                                    id="selectedModel"
                                                    className={classnames("", {
                                                        invalid: errors.model
                                                    })}
                                                >{this.state.model.Models.map((item, index) =>{
                                                    return <option key={index+10} value={item.model_name}>{item.model_name}</option>
                                                })}
                                            </Select>
                                            <span className={classes.error}>
                                                {errors.model}
                                            </span>
                                            </div>
                                        }
                                </div>              
                                 

                                        
                            
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
                                    className={classnames("", {
                                        invalid: errors.licensePlate
                                      })}
                                />
                                <span className={classes.error}>
                                    {errors.licensePlate}
                                </span>
                                 <TextField
                                    margin="dense"
                                    id="engine"
                                    label="Engine capacity"
                                    type="engine"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)} 
                                />
                            </div>

                            <Button variant="contained" color="primary" onClick={this.onConfirm}>Confirm</Button>
                    </Grid>
                </Card>
            </div>
         );
    }
}

AddCar.propTypes = {
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
)(AddCar));