import React from 'react';
import { connect } from 'react-redux';
import {
  shape, number, string, array, func,
} from 'prop-types';
import styled from 'react-emotion';
import { Form, Field } from 'react-final-form';
import {
  Typography,
  FormGroup,
  Label,
  Input,
  ControlFeedback,
  Checkbox,
  FormCheck,
  FormCheckLabel,
  Textarea,
} from '@smooth-ui/core-em';
import { updatePractice, deletePractice } from '../actions';
import Paragraph from './Paragraph';
import RadioButtonList from './RadioButtonList';
import { RadioButtonsWrapper } from './RadioButtonsWrapper';
import { BottomButtons } from './BottomButtons';

const StyledUl = styled('ul')`
    margin: 0;
    padding: 0;
`;

const StyledLi = styled('li')`
 list-style-type: none;
 font-size: 1.3rem;
 margin-bottom: 1rem;
`;

const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />;

const AdaptedInput = adapt(Input);
const AdaptedCheckbox = adapt(Checkbox);
const AdaptedTextarea = adapt(Textarea);

function lap({ round, length }, index) {
  return (
    <StyledLi key={index}>
      <FormCheck>
        <Field
          name={`pass${round}_${index}`}
          component={AdaptedCheckbox}
          type="checkbox"
          id={`pass${round}_${index}`}
        />
        <FormCheckLabel htmlFor={`pass${round}_${index}`}>{`${index + 1} runde (${length} sekunder)`}</FormCheckLabel>
      </FormCheck>
    </StyledLi>
  );
}

lap.propTypes = {
  round: number.isRequired,
  length: number.isRequired,
};

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { touched, error } }) => (touched && error ? (
      <ControlFeedback valid={!error}>{error}</ControlFeedback>
    ) : null)
        }
  </Field>
);

Error.propTypes = {
  name: string.isRequired,
};

const required = value => (value ? undefined : 'Required');

function TiredAsF(props) {
  const {
    submit,
    practice: {
      bpm,
      description,
      header,
      roundOne,
      roundTwo,
      notes,
      rating,
      pass1_0,
      pass1_1,
      pass1_2,
      pass1_3,
      pass1_4,
      pass1_5,
      pass1_6,
      pass1_7,
      pass2_0,
      pass2_1,
      pass2_2,
      pass2_3,
      pass2_4,
      pass2_5,
      pass2_6,
      pass2_7,
    },
  } = props;
  const lapsRoundOne = roundOne.map(lap);
  const lapsRoundTwo = roundTwo.map(lap);

  return (<Form
    onSubmit={submit}
    initialValues={{
      bpm,
      notes,
      rating: rating || 0,
      pass1_0: pass1_0 || false,
      pass1_1: pass1_1 || false,
      pass1_2: pass1_2 || false,
      pass1_3: pass1_3 || false,
      pass1_4: pass1_4 || false,
      pass1_5: pass1_5 || false,
      pass1_6: pass1_6 || false,
      pass1_7: pass1_7 || false,
      pass2_0: pass2_0 || false,
      pass2_1: pass2_1 || false,
      pass2_2: pass2_2 || false,
      pass2_3: pass2_3 || false,
      pass2_4: pass2_4 || false,
      pass2_5: pass2_5 || false,
      pass2_6: pass2_6 || false,
      pass2_7: pass2_7 || false,
    }}
    render={({
      handleSubmit, form, submitting, pristine,
    }) => (
      <form onSubmit={handleSubmit}>
        <Typography variant="h1">{header}</Typography>
        <FormGroup>
          <Label>Bpm</Label>
          <Field
            name="bpm"
            component={AdaptedInput}
            placeholder="Beats Per Minute"
            validate={required}
            control
          />
          <Error name="bpm" />
        </FormGroup>

        <Paragraph>{description}</Paragraph>
        <Typography variant="h2">Første halvdel</Typography>
        <StyledUl>
          {lapsRoundOne}
        </StyledUl>

        <Typography variant="h2">Andre halvdel</Typography>
        <StyledUl>{lapsRoundTwo}</StyledUl>

        <FormGroup>
          <Typography variant="h2">Rating</Typography>
          <RadioButtonsWrapper>
            <RadioButtonList />
          </RadioButtonsWrapper>
        </FormGroup>

        <FormGroup>
          <Label>Notater</Label>
          <Field
            name="notes"
            component={AdaptedTextarea}
            placeholder="Notater"
            control
            height="10rem"
          />
          <Error name="notes" />
        </FormGroup>

        <BottomButtons submitting={submitting} pristine={pristine} {...props} />
      </form>)}
  />
  );
}

TiredAsF.propTypes = {
  practice: shape({
    bpm: string,
    description: string.isRequired,
    header: string.isRequired,
    roundOne: array.isRequired,
    roundTwo: array.isRequired,
  }).isRequired,
  submit: func.isRequired,
};

export default connect(null, (dispatch, ownProps) => ({
  submit(newValues) {
    dispatch(updatePractice(ownProps.match.params.created, newValues));
  },
  deletePractice() {
    dispatch(deletePractice(ownProps.match.params.created));
  },
}))(TiredAsF);
