import React from "react";
import {Link} from "react-router-dom";
import {ListGroup, ListGroupItem} from 'reactstrap';

const Landing = () => (
  <ListGroup>
    <ListGroupItem className="justify-content-between" tag={Link} to="/fruits">Fruits</ListGroupItem>
    <ListGroupItem className="justify-content-between" tag={Link} to="/vegetables">Vegetables</ListGroupItem>
    <ListGroupItem className="justify-content-between" tag={Link} to="/seafood">Seafood</ListGroupItem>
  </ListGroup>
);
export default Landing;
