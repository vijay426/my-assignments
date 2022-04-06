import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signin } from '../services/user.services'

const SigninPage=(props)=>{

    const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  const onSignin=async()=>{
    if(username.length===0){
        alert('set username')
    }else if(password.length===0){
        alert('set password')

    }else{
        const result=await signin(username,password)
            if(result.errors && result.error.length> 0 ){
                const error=result.error[0].message
                alert(error)
            }else{
                if(result.data){
                    const token=result.data.signin.token
                    sessionStorage['token']=token
                    //sessionStorage['username']=username
                    navigate('/task-list')

                }
            }
        }
        }



        //if(result){
          //  const {token}=result
            //sessionStorage['token']=token
            //sessionStorage['username']=username
            //navigate('/task-list')

            //alert('success')
        //}else{
          // alert ('invalid username or password')
        //}


    return(

         <div>
            <h1 className="header">Sign In page</h1>
            <div className ="form">
            <div className ="mb-3">
            <label className="form-label">username</label>
            <input 
            onChange={(e) => {
                setUsername(e.target.value)
              }}
            type="text" className="form-control" />
        </div><div className="mb-3">
                <label className="form-label">Password</label>
                <input
                onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                type="password" className="form-control" />
            </div>
            <div className="mb-3">
                <div>
                    Don't have an account  ? signup<Link to="/signup">here</Link>
                </div>
                <button onClick={onSignin} className='btn btn-success'>Signin</button>
            </div>
            </div>
            </div>
            )
    }
export default SigninPage