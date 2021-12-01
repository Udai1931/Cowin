import logo from './logo.svg';
import './App.css';
import { useEffect, createContext, useReducer, useContext} from 'react'
import {reducer,initialState} from './reducers/userReducer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Privateroute from './Components/Privateroute';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export const UserContext = createContext()
 
function App() { 
  const [state, dispatch] = useReducer(reducer, initialState)
  return ( 
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Switch>
        <Privateroute exact path="/" component={Profile}/> 
        <Route path="/login" component={Login}/> 
        <Route path="/signup" component={Signup}/> 
      </Switch>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
