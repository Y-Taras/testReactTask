import React from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import {Card, CardImg, CardBlock, CardTitle, CardText, Button} from 'reactstrap';

const ProductCard = ({elem, cartIds, quantity, addItemToCart}) => (
  <Card className="m-1" style={{width: '18rem'}}>
    <CardImg top width="100%" src={`/public/img/${elem.image}`} alt="Card image cap"/>
    <CardBlock>
      <Link to={`/products/${elem.id}`}>
        <CardTitle>{elem.name}</CardTitle>
      </Link>
      <CardText>{elem.price}</CardText>
      <CardText>isAvailable</CardText>
      <CardText>{JSON.stringify(cartIds, null, 4)}</CardText>
      <CardText>{JSON.stringify(quantity, null, 4)}</CardText>

      {(cartIds.indexOf(elem.id) === -1) ?
        <Button onClick={() => addItemToCart(elem.id)}>Add to Cart</Button> :
        <Button>Remove from Cart</Button>}
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
  quantity: PropTypes.objectOf(PropTypes.number).isRequired
};
