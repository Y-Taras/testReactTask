import React from "react";
import PropTypes from 'prop-types'
import {Card, CardImg, CardBlock, CardTitle, CardText, Button} from 'reactstrap';

const ProductCard = ({elem, cartIds, quantity, addItemToCart, removeItemFromCart, history}) => (

  <Card className="m-1" style={{width: '18rem'}}
        onClick={() => {
          history.push(`/products/${elem.id}`)
        }}>
    <CardImg top width="100%" src={`/public/img/${elem.image}`} alt="Card image cap"/>
    <CardBlock>
      <CardTitle>{elem.name}</CardTitle>
      <CardText>{elem.price}</CardText>
      <CardText>
        {(!quantity[elem.id] || (elem.amount > quantity[elem.id])) ? "isAvailable" : "UnAvailable"}
      </CardText>
      <CardText>{JSON.stringify(cartIds, null, 4)}</CardText>
      <CardText>{JSON.stringify(quantity, null, 4)}</CardText>
      {(cartIds.indexOf(elem.id) === -1) ?
        <Button
          onClick={(event) => {
            event.stopPropagation();
            addItemToCart(elem.id)
          }}>
          Add to Cart</Button> :
        <Button
          onClick={(event) => {
            event.stopPropagation();
            removeItemFromCart(elem.id)
          }}
        >Remove from Cart</Button>}
    </CardBlock>
  </Card>
);
export default ProductCard;

ProductCard.propTypes = {
  elem: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string
  }).isRequired,
  cartIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  quantity: PropTypes.objectOf(PropTypes.number).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
};
