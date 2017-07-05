/* eslint-disable spaced-comment */
/* eslint no-console: 0 */

import React, {Component} from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import FaShoppingCart from "react-icons/fa/shopping-cart";
import {Nav, Navbar, Badge, Modal, ModalHeader, ModalBody, NavbarBrand, NavItem, Table} from "reactstrap";
import {connect} from 'react-redux';

import CartRow from '../components/CartTable'
import {
  setProductsQuantityById
} from '../redux/actionCreators';

class Header extends Component {

  static getWholeQUantityProducts(obj) {
    return Object.keys(obj)
      .reduce((sum, key) => sum + parseFloat(obj[key]), 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  getTotalCheckout() {
    return this.props.products
      .filter((elem) => (this.props.cartIds.indexOf(elem.id) > -1))
      .reduce((sum, obj) => sum + this.props.quantity[obj.id] * (obj.price).toFixed(2), 0)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  renderCartlist() {
    return this.props.products
      .filter((elem) => (this.props.cartIds.indexOf(elem.id) > -1))
      .map((elem, index) => <CartRow key={elem.id}
                                     elem={elem}
                                     setProductsQuantity={this.props.setProductsQuantity}
                                     index={index}
                                     quantity={this.props.quantity}/>
      )
  }

  render() {
    return (
      <div>
        <Navbar color="faded py-0" light role="navigation" toggleable>
          <NavbarBrand tag={Link} to="/">
            <img className="mx-2" src="/public/img/logo.png" height="32" alt="myLogo"/>
            <span className="navbar-text">Food on Track</span>
          </NavbarBrand>
          <Nav className="ml-auto">
            <NavItem onClick={this.toggle}>
              <FaShoppingCart size={36} color='Grey'/>
              {this.props.cartIds.length ?
                <Badge className="mx-1">{this.constructor.getWholeQUantityProducts(this.props.quantity)}</Badge> : null}
            </NavItem>
          </Nav>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Cart</ModalHeader>
          <ModalBody>
            <Table striped>
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
              </thead>
              <tbody>
              {this.renderCartlist()}
              <tr>
                <th scope="row">&nbsp;</th>
                <td colSpan={4}>Total sum to pay is: {parseFloat((this.getTotalCheckout()).toFixed(2))}$</td>
              </tr>
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const apiData = state.apiData ? state.apiData : [];
  const handleCart = state.handleCart;
  const quantityById = state.quantityById;


  return {
    products: apiData,
    cartIds: handleCart,
    quantity: quantityById
  };
};

const mapDispatchToProps = (dispatch) => ({
  setProductsQuantity(value) {
    dispatch(setProductsQuantityById(value));
  }
});

Header.defaultProps = {
  products: []
};

Header.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  setProductsQuantity: PropTypes.func.isRequired,
  cartIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantity: PropTypes.objectOf(PropTypes.number).isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
