import React from 'react';
import { any } from 'prop-types';
import { Grid, Row, Col } from '@smooth-ui/core-em';
import styled from 'react-emotion';
import Menu from './Menu';

const WrapperWrapper = styled('div')`
  max-width: 35rem;
  margin: 0 auto;
`;

const Wrapper = ({ children }) => (
  <WrapperWrapper>
    <Grid fluid mt={50}>
      <Row>
        <Col>
          <Menu />
          {children}
        </Col>
      </Row>
    </Grid>
  </WrapperWrapper>
);

Wrapper.propTypes = {
  children: any.isRequired,
};

export default Wrapper;
