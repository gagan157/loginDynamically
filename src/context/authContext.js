import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import CryptoJS from "crypto-js";

export const AuthContext = createContext(null);

export const AuthState = () => {
  return useContext(AuthContext);
};

function AuthContextProvider({ children }) {
  const [islogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [remeberLogin,setRemberLogin] = useState(false)
  const [loginInp, setLoginInp] = useState({email:'',password:''})

  

  useEffect(() => {
    
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    let userData = JSON.parse(localStorage.getItem("user"));
    let remeberLocalStorage = JSON.parse(localStorage.getItem('remeberLogin'))
    
    if (isLogin) {
      setLogin(isLogin);
      setUser(userData);
    }
    
    if(remeberLocalStorage){      
      setRemberLogin(true)
      var bytes  = CryptoJS.AES.decrypt(remeberLocalStorage.password, `${process.env.PASSWORD_Secret_KEY}`);
      var originalPass = bytes.toString(CryptoJS.enc.Utf8);
      setLoginInp({...remeberLocalStorage,password:originalPass})
    }
  }, []);

  useEffect(() => {
    if (islogin) {
      const {password, ...rest} = user
      localStorage.setItem("isLogin", JSON.stringify(islogin));
      localStorage.setItem("user", JSON.stringify(rest));
    }

    if (!islogin) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
    }

    if(islogin && remeberLogin){
      var ciphertext = CryptoJS.AES.encrypt(loginInp.password, `${process.env.PASSWORD_Secret_KEY}`).toString();
      localStorage.setItem('remeberLogin',JSON.stringify({...loginInp,password:ciphertext}))
    }
    else if(islogin && !remeberLogin){
      setLoginInp({email:'',password:''})
      localStorage.removeItem('remeberLogin')
    }
  }, [islogin]);


  return (
    <AuthContext.Provider value={{ islogin, setLogin, user, setUser, remeberLogin, setRemberLogin, loginInp, setLoginInp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
