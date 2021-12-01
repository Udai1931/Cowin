import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App';
import { useHistory } from 'react-router-dom';
import styles from './Signup.module.css';

function Signup() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const {state,dispatch} =useContext(UserContext);
    const handleSignup =async (e)=>{
        console.log('hi');
        e.preventDefault()
        let obj = {"email":email,"password":password};
        try {
          setLoading(true)
          const response = await fetch('/signup',{
              method:'POST',
              headers:{
                "Content-Type" : "application/json",
              },
              body: JSON.stringify(obj)
          })
          console.log(response)
          setLoading(false)
          console.log("Signed up.")
          history.push('/login')
        } catch {
          setError("Failed to Sign in")
          setTimeout(()=>setError(''),2000)
          setLoading(false)
        }
    }
    useEffect(()=>{
        if(state)
        {
          history.push('/')
        }
      },[])
    return (
        <div className={styles.container}>
        <div className={styles.banner}>
          <h2>Welcome to Cowin Notifier</h2>
          <h5>Please Sign up to proceed</h5>  
        </div>  
        <div className={styles.mycard}>
            <form onSubmit={handleSignup} >
                <div>
                <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className={`btn waves-effect waves-light ${styles.myleft}`} type='submit' disabled={loading}>SignUp</button>
            </form>
        </div>
        </div>
    )
}

export default Signup