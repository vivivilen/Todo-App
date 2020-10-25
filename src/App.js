import React from 'react';
import './App.css';
import LoginPage from './Component/LoginPage';
import ButtonLoginSignUp from './Component/ButtonLoginSignUp';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUpPage from './Component/SignUpPage';
import Todo from './Component/Todo';
import Dashboard from './Component/Dashboard';
import Profile from './Component/Profile';
import { GlobalProvider } from './Context/GlobalContext';
import ChangePassword from './Component/ChangePassword';
import Shop from './Component/Shop';

function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;

  if(!localStorage.getItem('token') && !localStorage.getItem('dataUser')) {
    alert('Token invalid. Please re-login!')
    return <Redirect to='login'/>
  }

  return (
    <Route path={props.path}>
      <Component {...rest} />
    </Route>
  )
}

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <ButtonLoginSignUp />
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <ProtectedRoute exact path="/todo" component={Todo} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/change-password" component={ChangePassword} />
            <ProtectedRoute exact path="/shop" component={Shop} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;