import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthState } from "../context/authContext";
import bcrypt from "bcryptjs-react";



function LoginForm() {
  const { setUser, setLogin, remeberLogin, setRemberLogin, loginInp, setLoginInp } = AuthState();
  
  let navigate = useNavigate();

  function handleOnChange(e){
    const {value,name} = e.target
    setLoginInp({...loginInp,[name]:value})
  }

  function handleLogin(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    
    const { password, ...rest } = formData;

    const Secret_Key = process.env.PASSWORD_Secret_KEY

    let data = JSON.parse(localStorage.getItem('credentials'))
    let findUser = data.find(user=>user.email === rest.email)

    if(!findUser){
      return
    }

    let  passCorrect = bcrypt.compareSync(password + Secret_Key, findUser.password);
    if (passCorrect) {
      setLogin(true);
      setUser(findUser);
      navigate("/");
    }
  }
  return (
    <>

    <form onSubmit={(e) => handleLogin(e)}>
      <input type="text" placeholder="email" name="email" value={loginInp.email} onChange={(e)=>handleOnChange(e)} />
      <input type="password" placeholder="password" name="password" value={loginInp.password} onChange={(e)=>handleOnChange(e)} />
      <button type="submit">Login</button>

      <input id="remberMe" type="checkbox" checked={remeberLogin} onChange={()=>setRemberLogin(!remeberLogin)} name="remeber"/>
      <label htmlFor="remberMe">Remember Me</label>
    </form>
    <Link to={'/signup'}>Signup</Link>
    </>
  );
}

export default LoginForm;
