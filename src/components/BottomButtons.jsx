import React from 'react';
import {
  any, func,
} from 'prop-types';
import {

  Box,
  Button,

} from '@smooth-ui/core-em';

import ConfirmDelete from './ConfirmDelete';

export function BottomButtons({ submitting, pristine, deletePractice }) {
  return (
    <Box display="flex" justifyContent="space-around">
      <Button
        type="submit"
        disabled={submitting || pristine}
        variant="primary"
      >
      Oppdater
      </Button>

      <ConfirmDelete deletePractice={deletePractice} />

    </Box>
  );
}

BottomButtons.propTypes = {
  submitting: any.isRequired,
  pristine: any.isRequired,
  deletePractice: func.isRequired,
};
