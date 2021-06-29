import Header from './components/header'
import Home from './components/Home'
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from "./components/Checkout"
import Login from "./components/Login"
import {auth} from "./firebase"
import {useStateValue} from "./StateProvider"
import { useEffect } from 'react';
import Payment from './components/Payment'
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"

const promise = loadStripe('pk_test_51IG7xkKTxMCJ3SkZJRV3D6FDnYx4Z4bvpqNXyZHDQ5UCjQXqG0ja2O4SQWTYamAFa32wEyyjSnpcwRSfgZq6YOm900yCov1dX0')


function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app conponent loads...

    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })   
      } else {
        // the user is logged out

        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
        
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
