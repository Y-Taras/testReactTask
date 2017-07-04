/* eslint-disable spaced-comment */
import React from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Jumbotron, Row, Col, Button, Badge} from 'reactstrap';
import FaArrowCircleLeft from "react-icons/fa/arrow-circle-left";

import {
  addToCart,
  removeFromCart
} from '../redux/actionCreators';

const ProductDetails = ({addItemToCart, removeItemFromCart, products, cartIds, match}) => {
  const selectedProduct = products.find(product => match.params.id === product.id);
  return (
      <Jumbotron>
        <Row>
          <Col xs="3">
            <img src={`/public/img/${selectedProduct.image}`} alt={`$\{selectedProduct.image}`}/>
          </Col>
          <Col>
            <Link to={`/${selectedProduct.category}`}><FaArrowCircleLeft size={48} color='SkyBlue'/></Link>
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.description}</p>
            <p>Origin country: {selectedProduct.manufacturer}</p>
            <h2><Badge color="danger">{selectedProduct.price} $</Badge></h2>
            {(cartIds.indexOf(match.params.id) === -1) ?
              <Button
              onClick={(event) => {event.stopPropagation(); addItemToCart(match.params.id)}}>
              Add to Cart</Button> :
            <Button
              onClick={(event) => {event.stopPropagation(); removeItemFromCart(match.params.id)}}
            >Remove from Cart</Button>}
          </Col>
        </Row>
      </Jumbotron>)
};

const mapStateToProps = (state) => {
  const apiData = state.apiData ? state.apiData : [];
  const handleCart = state.handleCart;

  return {
    products: apiData,
    cartIds: handleCart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart(value) {
    dispatch(addToCart(value));
  },
  removeItemFromCart(value) {
    dispatch(removeFromCart(value));
  }
});

ProductDetails.defaultProps = {
  products: []
};

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  cartIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
