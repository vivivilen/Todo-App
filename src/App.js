import React, { useState } from 'react';
import './App.css';
import { InputField } from './Component/InputField';
import { TodoList } from './Component/TodoList';
import axios from 'axios';
import LoginPage from './Component/LoginPage';
import ButtonLoginSignUp from './Component/ButtonLoginSignUp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpPage from './Component/SignUpPage';
import Todo from './Component/Todo';
import { GlobalProvider } from './Context/GlobalContext';

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <ButtonLoginSignUp />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/todo" component={Todo} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;