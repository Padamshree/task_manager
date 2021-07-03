import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TaskList from './components/TaskList';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/utils/PrivateRoutes';
import AuthProvider from './providers/AuthProvider';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={TaskList}/>
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </AuthProvider> 
      </Router>
    </div>  
  );
}

export default App;
