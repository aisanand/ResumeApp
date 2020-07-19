import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route,BrowserRouter } from "react-router-dom";
import Thankyou from './components/Thankyou';
import ProfileAlreadyExists from './components/ProfileAlreadyExists';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Router>
          <Switch>
            {/* -----++++++----- ROUTES -----++++++----- */}
            <Route exact path="/" component={Navbar} />
            <Route exact path="/thank-you" component={Thankyou} />
            <Route exact path="/profile-exists" component={ProfileAlreadyExists} />
          </Switch>
        </Router>
        </BrowserRouter>
      </div>)

  }
}

export default App;
