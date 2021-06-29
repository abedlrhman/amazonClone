import { useStateValue } from "./../StateProvider";
import "./Product.css"
function Product({id,title,price,rating,image}) {
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  let rating__count = [];
  for(var i=1;i<=rating;i++){
    rating__count.push('⭐');
  }
  return (
    <div className="product">
      <div className="product__info">
          <p>{title}</p>
          <p className="price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
        <div className="product__rating">
          <p>{rating__count}</p>
        </div>
      </div>
      <img src={image} alt="book" className="product__img"/>
      <button onClick={addToBasket}>add to basket</button>
    </div>
  )
}
export default Product
