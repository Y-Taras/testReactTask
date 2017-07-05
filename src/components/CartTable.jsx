import React from "react";
import PropTypes from 'prop-types'
import {Input} from "reactstrap"

  const CartRow = ({elem, setProductsQuantity, index, quantity}) => (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{elem.name}</td>
      <td>{elem.price}</td>
      <td><Input type="number" min="0" max="10000" step="1"
                 onChange={(evt) => setProductsQuantity({[elem.id]: parseInt(evt.target.value, 10)})}
                 value={quantity[elem.id]}/></td>
      <td>{(quantity[elem.id] * elem.price).toFixed(2)}</td>
    </tr>);

export default CartRow;

CartRow.propTypes = {
  index: PropTypes.number.isRequired,
  elem: PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  setProductsQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.objectOf(PropTypes.number).isRequired,
};
