import React from 'react';
import { withRouter } from 'react-router-dom';
import { func, any } from 'prop-types';
import {
  Button,
} from '@smooth-ui/core-em';

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
    };

    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete() {
    const { confirmDelete } = this.state;
    const { deletePractice, history } = this.props;
    if (confirmDelete) {
      history.push('/');
      deletePractice();
    } else {
      this.setState({
        confirmDelete: true,
      });
    }
  }

  render() {
    const { confirmDelete } = this.state;

    return (
      <Button
        type="button"
        variant="danger"
        onClick={this.handleClickDelete}
      >
        { confirmDelete ? 'Er du helt sikker?' : 'Slett øving' }
      </Button>
    );
  }
}

ConfirmDelete.propTypes = {
  deletePractice: func.isRequired,
  history: any.isRequired,
};

export default withRouter(ConfirmDelete);
