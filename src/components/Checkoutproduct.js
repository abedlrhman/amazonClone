import React from 'react'
import { useStateValue } from '../StateProvider'
import "./Checkoutproduct.css"
function Checkoutproduct({id,image,title,price,rating}) {
  const [{basket},dispatch] = useStateValue()
  const removeFromBasket = () => {
    //remove the item from the basket
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    })
  }
  return (
    <div className="checkoutproduct">
      <img src={image} class="checkoutproduct__image" alt="product_image"/>

      <div className="checkoutproduct__info">
        <p className="checkoutproduct__title">{title}</p>
        <p className="checkoutproduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutproduct__rating">
          {Array(rating)
          .fill()
          .map(() => (
            <p>⭐</p>
          ))}
        </div>
        <button onClick={removeFromBasket}>remove from basket</button>
      </div>
    </div>
  )
}

export default Checkoutproduct
