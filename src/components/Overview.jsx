import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { arrayOf, Any } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import styled from 'react-emotion';

import { Typography, Select } from '@smooth-ui/core-em';
import Wrapper from './Wrapper';
import { Paragraph } from '.';

const StyledHeader = styled('span')`
  flex: 1 0 25%;
`;

const StyledDate = styled('span')`
  flex: 1 0 25%;
  font-size: .8rem;
`;


const StyledBpmWrapper = styled('span')`
  flex: 1 0 25%;
  margin-left: 5px;
  font-size: .8rem;
`;

const StyledRating = styled('span')`
  flex: 1 0 25%;
  margin-left: 5px;
  color: #bd4932;
  float: right;
  position: relative;
`;

const StyledBpm = styled('span')`
  font-size: 1.2rem;
`;


const RatingText = styled('span')`
  font-size: .5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;

  &:link, &:visited {
    color: black;
  }
  &:hover {
    background-color: #bd4932;
    color: white;
  }

  &:hover > span {
    color: white;
  }
`;


class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: '',
    };

    this.handleDropdownSelected = this.handleDropdownSelected.bind(this);
  }

  handleDropdownSelected(selectedFilter) {
    this.setState({
      selectedFilter,
    });
  }

  render() {
    const { practices } = this.props;
    const { selectedFilter } = this.state;

    const typesObj = practices.filter(el => el && el.type).reduce((res, { header, type }) => {
      res[type] = { label: header, value: type };
      return res;
    }, {});

    let types = [];
    types.push({ label: 'Ingen', value: '' });
    types = types.concat(Object.values(typesObj));

    const list = practices.filter(el => el && (selectedFilter === '' || el.type === selectedFilter)).map(el => (
      <StyledLink key={el.created} to={`/practice/${el.created}`}>
        <StyledHeader>{el.setupComplete ? `${el.header} ` : 'Øvelse ikke satt opp'}</StyledHeader>
        <StyledDate>
(
          <Moment fromNowDuring={172800000} format="DD.MM.YYYY">{el.created}</Moment>
)
        </StyledDate>
        {el.bpm && (
        <StyledBpmWrapper>
BPM:
          {' '}
          <StyledBpm>{el.bpm}</StyledBpm>
        </StyledBpmWrapper>
        )}
        {el.rating && (
        <StyledRating>
          <RatingText>Rating</RatingText>
          <span>{el.rating}</span>
        </StyledRating>
        )}
      </StyledLink>));


    return (
      <Wrapper>
        <Typography variant="h1">Oversikt over alle øvinger</Typography>
        <Typography variant="h2">Filter</Typography>
        <Select
          onChange={e => this.handleDropdownSelected(e.target.value)}
          control
          options={types}
        />

        <br />
        <div>
          {list.length > 0 ? list : (<Paragraph>Ingen øvelser enda/Laster</Paragraph>)}
        </div>
      </Wrapper>);
  }
}

Overview.propTypes = {
  practices: arrayOf(Any).isRequired,
};

export default compose(
  firebaseConnect([
    'practices', // { path: '/todos' } // object notation
  ]),
  connect(
    state => ({ practices: state.firebase.data.practices ? Object.values(state.firebase.data.practices) : [] }),
  ),
)(Overview);
