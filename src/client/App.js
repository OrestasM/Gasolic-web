import React, { Component } from 'react';
import './app.css';
import Navbar from './components/NavBarComponent/navbar';
import { Provider } from 'react-redux'
import store from "./store";
import Login from './components/LoginComponent/login';
import Register from './components/RegistrationComponent/registration';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from '../client/components/PrivateRouteComponent/privateroute';
import Home from "./components/HomeComponent/home";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import AddCar from './components/AddCarComponent/addcar';
import AddConsumption from './components/AddConsumption/addconsumption';
import AllConsumptions from './components/AllConsumptions/allconsumptions';
import EditConsumption from './components/EditConsumptionComponent/editconsumption';
import Statistics from './components/StatisticsComponent/statistics';
import Decoder from './components/DecoderComponent/decoder';
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar/> 
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/ibusdecode" component={Decoder} />
                
                {/* <Route exact path="/home" component={Home} /> */}
                
                <Switch>
                  <PrivateRoute exact path="/home" component={Home} />
                  <PrivateRoute exact path="/addcar" component={AddCar} />
                  <PrivateRoute exact path="/addconsumptions" component={AddConsumption} />
                  <PrivateRoute exact path="/statistics" component={Statistics} />
                  <PrivateRoute exact path="/consumptions" component={AllConsumptions} />
                  <PrivateRoute exact path="/editconsumption" component={EditConsumption} />
                </Switch>
            </Switch>
          </div>
        </Router>
      </Provider> 
    );
  }
}
