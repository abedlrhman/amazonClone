import {useEffect, useState} from 'react'
import { Link , useHistory} from 'react-router-dom'
import {useStateValue} from './../StateProvider'
import CheckoutProduct from './Checkoutproduct'
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import "./Payment.css"
import CurrencyFormat from 'react-currency-format'
import axios from './../axios'

//import {getBasketTotal} from './../reducer'

function Payment() {
  
  const [{basket , user}, dispatch ] = useStateValue()
  const history = useHistory()

const [succeeded, setSucceeded] = useState(false);
const [processing, setProcessing] = useState('')

  const stripe = useStripe();
  const Elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  let itmePrice = 0;
  basket.map((item) => {
      return itmePrice += item.price;
    })

  useEffect(() => {
    // generete the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // stripe expects the total in a currencies subunits
        url: `/payments/create?total=${itmePrice * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket])

  const handleSubmit = async (e) => {
    // do all the fancy stripe stuff...
    e.preventDefault()
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method :{
          card: Elements.getElement(CardElement),
        }
      }).then(({paymentIntent}) =>{
        // paymentIntent = payment confirmation

       


        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET"
        })

        history.replace('/')
      })
    }
  const handleChange = event => {
    // listen for changes in the CardElement
    // and display any errors as the customer types their caard details
    setDisabled(event.empty);
    setError(event.ettot ? event.error.message : "");
  }


  return (
    <div className='payment'>
      <div className="payment__container">
        <h1>checkout (<Link to='checkout'>{basket?.length} items</Link>)</h1>
        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="paymenet__address">
            <p>{user?.email}</p>
            <p>123 react lane</p>
            <p>los angelos, ca</p>
          </div>
        </div>
        {/* payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => (
              <CheckoutProduct 
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating} />
            ))}
          </div>
        </div>
        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>payment method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                renderText={(value) => (
                  <h3>order Total: {value}</h3>
                )}
                decimalScale={2}
                value={itmePrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"} />
                <button disabled={processing ||disabled || succeeded}>
                <span>{processing ? <p>Processing </p> : "Buy now"}</span></button>
              </div>
              {/* errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
