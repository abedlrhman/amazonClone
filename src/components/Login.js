import React, { useState } from 'react'
import {Link, useHistory} from "react-router-dom"
import {auth} from "./../firebase"
import './Login.css'
function Login() {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signin = e => {
    e.preventDefault();
    
    auth
        .signInWithEmailAndPassword(email,password)
        .then((auth) => {
          // it succeessfully ceated a new user with email and password
          if (auth) {
            history.push('/')
          }
        })
        .catch(error => alert(error.message))
  }
  const register = e => {
    e.preventDefault()

    auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) => {
          // it succeessfully ceated a new user with email and password
          if (auth) {
            history.push('/')
          }
        })
        .catch(error => alert(error.message))
  }
  return (
    <div className="login">
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="amazon logo"
        className="login__logo" />
      </Link>
      <div className="login__container">
        <h1>sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e=> setEmail(e.target.value)}/>

          <h5>password</h5>
          <input type="password" value={password} onChange={e=> setPassword(e.target.value)} />

          <button className="login__signInButton" type="submit" onClick={signin}>sign In</button>
        </form>

        <p>
          by signing-in you agree to the AMAZON FAKE CLONE conditions of use & sale. please see our privacy notice, and our interest-based Ads notice.
        </p>
        <button className="login__registerButton" onClick={register}>create yout amazon account</button>
      </div>
    </div>
  )
}

export default Login
