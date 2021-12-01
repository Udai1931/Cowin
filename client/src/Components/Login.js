import React,{useState,useContext, useEffect} from 'react'
import { useHistory,Link } from 'react-router-dom';
import M from 'materialize-css';
import {UserContext} from '../App';
import styles from './Login.module.css'

function Login() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [lat,setLat] = useState(0);
    const [lon,setLon] = useState(0);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const {state,dispatch} =useContext(UserContext);
    const history = useHistory();
    const handleSubmit = async(e)=>{
        console.log('hi');
        e.preventDefault();
        let obj = {"email":email,"password":password};
        try {
          console.log('Logging in user')
          setLoading(true)
          fetch('/login',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "email":email,
                "password":password
            })
          })
          .then( res => res.json())
          .then((data) => {
              if(data.error){
                   M.toast({html: data.error, classes:"#c62828 red darken-2"})
              }else{
                  dispatch({type:"USER", payload:data.user})
                  M.toast({html:"Login Success",classes:"#43a047 green darken-1"})
                  fetch(`https://apis.mapmyindia.com/advancedmaps/v1/5d8b3cd25ee80a68a85ec4d1173c0b70/rev_geocode?lat=${lat}&lng=${lon}`)
                  .then((res)=> res.json())
                  .then((data)=>{
                      let pin = data.results[0].pincode 
                      fetch('/login-check',{ 
                        method:"POST",   
                        headers:{
                            "Content-Type" : "application/json",
                        },
                        body: JSON.stringify({
                            "email":email,
                            "pin":pin,
                            "age":age
                        })
                      }) 
                      .then(()=>{
                        M.toast({html:"Email Notifier Enabled",classes:"#43a047 green darken-1"});
                        history.push({
                            pathname:'/',
                            state:{age:age,pin:pin}
                        });
                      })
                  })
              }
          })
        }catch(err){
          setError("Failed to log in")
          setTimeout(()=>setError(''),2000)
          setLoading(false)
        }
        setLoading(false)
    }
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
          });
        if(state)
        {
            history.push('/')
        }
    },[])
    return (
        <div className={styles.container}>
        <div className={styles.banner}>
            <h2>Welcome to Cowin Notifier</h2>
            <h5>Please Login to enable Email Notifications</h5>
        </div>
        <div className={styles.mycard}>
              <form onSubmit={handleSubmit} >
             <div> 
                <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                <label htmlFor=''>Age</label>
                    <input type='number' value={age} onChange={(e)=>setAge(e.target.value)}/>
                </div>
                <button className={`btn waves-effect waves-light ${styles.myleft}`} type='submit' disabled={loading}>Login</button>
                <Link to="/signup"><button className={`btn waves-effect waves-light ${styles.myright}`}>Signup</button></Link>
                {error?<h1>{error}</h1>:<></>}
                </form>   
        </div>
        </div>
    )
}

export default Login 