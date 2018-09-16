import React from 'react';
import { any } from 'prop-types';
import { Grid, Row, Col } from '@smooth-ui/core-em';
import Menu from './Menu';

const Wrapper = ({ children }) => (
  <Grid>
    <Row>
      <Col>
        <Menu />
      </Col>
      <Col xs={6}>
        {children}
      </Col>
      <Col>3 of 3</Col>
    </Row>
  </Grid>
);

Wrapper.propTypes = {
  children: any.isRequired,
};

export default Wrapper;
