import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Typography } from '@smooth-ui/core-em';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';

import Wrapper from './Wrapper';
import { addPractice } from '../actions';

class AddPractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
    };

    this.handleChangedDate = this.handleChangedDate.bind(this);
    this.complete = this.complete.bind(this);
  }

  handleChangedDate(momentDate) {
    this.setState({
      selectedDate: momentDate.valueOf(),
    });
  }

  complete() {
    const { submit } = this.props;
    const { selectedDate } = this.state;
    this.setState({
      complete: true,
    });
    submit(selectedDate);
  }

  render() {
    const { selectedDate, complete } = this.state;

    if (complete) {
      return (<Redirect to={`/practice/${selectedDate}`} />);
    }

    return (
      <Wrapper>
        <Typography variant="h1">Legg til øving</Typography>
        <Calendar onChange={this.handleChangedDate} />
        <br />
        {selectedDate && <Button onClick={this.complete}>Legg til dag</Button>}
      </Wrapper>
    );
  }
}


AddPractice.propTypes = {
  submit: func.isRequired,
};


export default connect(
  null,
  dispatch => ({
    submit(date) {
      dispatch(addPractice(date));
    },
  }),
)(AddPractice);
