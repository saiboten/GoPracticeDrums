import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';

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
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <Calendar onChange={this.handleChangedDate} />
        {selectedDate && <button type="button" onClick={this.complete}>Legg til dag</button>}
      </div>
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
