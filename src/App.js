import React from 'react';
import './App.css';
import LoginPage from './Component/LoginPage';
import ButtonLoginSignUp from './Component/ButtonLoginSignUp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpPage from './Component/SignUpPage';
import Todo from './Component/Todo';
import Dashboard from './Component/Dashboard';
import Profile from './Component/Profile';
import { GlobalProvider } from './Context/GlobalContext';
import ChangePassword from './Component/ChangePassword';

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <ButtonLoginSignUp />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/todo" component={Todo} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/change-password" component={ChangePassword} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;