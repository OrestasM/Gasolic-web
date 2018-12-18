import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Navbar from './components/NavBarComponent/navbar';
import { Provider } from 'react-redux'
import store from "./store";
import Login from './components/LoginComponent/login';
import Register from './components/RegistrationComponent/registration';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from '../client/components/PrivateRouteComponent/privateroute';
import Home from "./components/HomeComponent/home";
import Background from './utils/back.jpg'
import Img from 'react-image'

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
                <Route exact path="/home" component={Home} />
                
                {/* <Switch>
                  <PrivateRoute exact path="/home" component={Home} />
                </Switch> */}
            </Switch>
          </div>
        </Router>
      </Provider> 
    );
  }
}
