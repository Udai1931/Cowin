import React,{useContext} from 'react'
import { Route,Redirect } from 'react-router-dom';
import {UserContext} from '../App';

function PrivateRoute({component:Component,...rest}) {
    const {state} = useContext(UserContext);
    return (
       <Route {...rest} render={props=>{
           return state?<Component {...props} />:<Redirect to='/login'/>
       }}/>
    )
}

export default PrivateRoute