/* eslint-disable spaced-comment */
import React from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';

const ProductDetails = (props) => (
    <Row>
      <Col>.col</Col>
      <Col>{JSON.stringify(props.products, null, 4)}</Col>
    </Row>
  );

const mapStateToProps = (state) => {
  const apiData = state.apiData ? state.apiData : [];

  return {
    products: apiData
  };
};

ProductDetails.defaultProps = {
  products: []
};

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, null)(ProductDetails);
