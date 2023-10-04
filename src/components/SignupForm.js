import React from 'react'
import bcrypt from "bcryptjs-react";
import { Link, useNavigate } from 'react-router-dom';

function SignupForm() {
    let navigate = useNavigate()
    function hanldeSignup(e){
        e.preventDefault()
        let formdata = new FormData(e.target)
        formdata = Object.fromEntries(formdata)

        let Secret_Key = process.env.PASSWORD_Secret_KEY
        let salt = bcrypt.genSaltSync(10);
        let hashPass = bcrypt.hashSync(formdata.password + Secret_Key , salt);

        formdata = {...formdata,password:hashPass}
        const {confirmPassword, ...rest} = formdata
        let data = JSON.parse(localStorage.getItem('credentials'))
        if(!data){
            localStorage.setItem('credentials',JSON.stringify([rest]))
            navigate('/login')
            return
        }
        
        let findUser = data.find(user=>user.email === formdata.email)

        if(!findUser){
            localStorage.setItem('credentials',JSON.stringify([...data,rest]))
            navigate('/login')
        }        
                
    }
  return (
    <>
    <form onSubmit={(e)=>hanldeSignup(e)}>
        <input type='text' placeholder='Name' name='name'/>
        <input type='email' placeholder='Email' name='email'/>
        <input type='password' placeholder='Password' name='password'/>
        <input type='password' placeholder='Confirm password' name='confirmPassword'/>
        <button type='submit'>Signup</button>
    </form>
    <Link to={'/login'}>Login</Link>
    </>
  )
}

export default SignupForm