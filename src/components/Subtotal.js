import "./Subtotal.css"
import CurrencuFormat from 'react-currency-format'
import { useStateValue } from "../StateProvider";
import {useHistory} from 'react-router-dom'

function Subtotal({price}) {
  const history= useHistory();
  const [{ basket }] = useStateValue();
  let itmePrice = 0;
  basket.map((item) => {
      return itmePrice += item.price;
    })
  return (
    <div className='subtotal'>
      <CurrencuFormat
        renderText={(value)=> (
          <>
            <p>
              subtotal ({basket.length} items):
              <strong><small>$</small>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox"/> THis order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={itmePrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"} />

        <button onClick={e => history.push('/payment')}>proceed to checkout</button>
    </div>
  )
}

export default Subtotal
