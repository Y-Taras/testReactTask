/* eslint no-console: 0 */
/* eslint-disable spaced-comment */


import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Row, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import InputRange from 'react-input-range';

import {
  setFilterTerm,
  setFilterPrice,
  changeSortKey,
  getAPIDetails,
  addToCart,
  removeFromCart
} from '../redux/actionCreators';
import ProductCard from '../components/ProductCard'

class ProductsList extends Component {

  componentDidMount() {
    if (!this.props.products[0]) {
      this.props.getAPIData();
    }
  }

  renderProductsList() {
    function mapProductCards(elem) {
      return (
        <ProductCard key={elem.id} elem={elem} cartIds={this.props.cartIds}
                     quantity={this.props.quantity}
                     addItemToCart={this.props.addItemToCart}
                     removeItemFromCart={this.props.removeItemFromCart}
                     history={this.props.history}
        />
      )
    }

    if (this.props.sortListKey)
      return (
        this.props.products
          .slice()
          .sort((a, b) => a.price - b.price)
          .filter((elem) => ((elem.category === this.props.match.params.category) &&
            (elem.manufacturer.toUpperCase().indexOf(this.props.filterVal.toUpperCase()) >= 0) &&
            (elem.price >= this.props.filterRange.min && elem.price <= this.props.filterRange.max))
          )
          .map(mapProductCards, this)
      );
    return (
      this.props.products
        .filter((elem) => ((elem.category === this.props.match.params.category) &&
          (elem.manufacturer.toUpperCase().indexOf(this.props.filterVal.toUpperCase()) >= 0) &&
          (elem.price >= this.props.filterRange.min && elem.price <= this.props.filterRange.max))
        )
        .map(mapProductCards, this)
    )
  }

  render() {
    return (
      <div className="landing">
        <Row>
          <div className="col-10 justify-content-center d-flex flex-row flex-wrap">
            {this.renderProductsList()}
          </div>
          <div className="col-2 justify-content-center">
            <InputGroup>
              <InputGroupAddon>@</InputGroupAddon>
              <input type="text" className="form-control"
                     name="filter1"
                     value={this.props.filterVal}
                     onChange={this.props.handleFilterTermChange}
                     placeholder="Grown in:"
                     aria-describedby="basic-addon1"/>
            </InputGroup>
            <br/>
            <InputGroup>
              <InputRange
                formatLabel={value => `${value}$`}
                maxValue={20}
                minValue={0}
                value={this.props.filterRange}
                onChange={value => this.props.handleFilterRangeChange(value)}/>
            </InputGroup>
            <br/>
            <InputGroup>
              <InputGroupAddon>
                <Input addon type="checkbox" aria-label="Checkbox for following text input"
                       placeholder="Sort by price"
                       defaultChecked={this.props.sortListKey}
                       onChange={this.props.handleInputChange}/>
              </InputGroupAddon>
              <InputGroupAddon>Sort by price</InputGroupAddon>
            </InputGroup>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const filterTerm = state.filterTerm ? state.filterTerm : "";
  const filterPrice = state.filterPrice;
  const apiData = state.apiData ? state.apiData : [];
  const sortKey = state.sortKey;
  const handleCart = state.handleCart;
  const quantityById = state.quantityById;

  return {
    products: apiData,
    filterVal: filterTerm,
    filterRange: filterPrice,
    sortListKey: sortKey,
    cartIds: handleCart,
    quantity: quantityById
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAPIData() {
    dispatch(getAPIDetails());
  },
  handleFilterTermChange(evt) {
    dispatch(setFilterTerm(evt.target.value));
  },
  handleFilterRangeChange(value) {
    dispatch(setFilterPrice(value));
  },
  handleInputChange(evt) {
    dispatch(changeSortKey(evt.target.checked))
  },
  addItemToCart(value) {
    dispatch(addToCart(value));
  },
  removeItemFromCart(value) {
    dispatch(removeFromCart(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

ProductsList.defaultProps = {
  getAPIData: null,
  products: [],
  filterVal: "",
  filterRange: {min: 1, max: 10},
  sortListKey: false
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  getAPIData: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string
    })
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  handleFilterTermChange: PropTypes.func.isRequired,
  handleFilterRangeChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  filterVal: PropTypes.string,
  filterRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  sortListKey: PropTypes.bool,
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  cartIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantity: PropTypes.objectOf(PropTypes.number).isRequired
};
