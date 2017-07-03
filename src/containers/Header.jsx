/* eslint-disable spaced-comment */
import React, {Component} from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import FaShoppingCart from "react-icons/fa/shopping-cart";
import {Nav, Navbar, Badge, Modal, ModalHeader, ModalBody, NavbarBrand, NavItem} from "reactstrap";
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
              <FaShoppingCart/>
              {this.props.cartIds.length ? <Badge className="mx-1">{this.props.cartIds.length}</Badge> : null}
            </NavItem>
          </Nav>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Cart</ModalHeader>
          <ModalBody>Purchases list</ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const handleCart = state.handleCart;

  return {
    cartIds: handleCart,
  };
};

Header.propTypes = {
  cartIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default connect(mapStateToProps, null)(Header);
