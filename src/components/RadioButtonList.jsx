import React from 'react';
import { Field } from 'react-final-form';
import {
  FormCheckLabel,
  Radio,
} from '@smooth-ui/core-em';

const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />;

const AdaptedRadio = adapt(Radio);


const RadioButtonList = () => {
  const list = [];

  for (let i = 0; i < 10; i++) {
    const item = (
      <React.Fragment key={i + 1}>
        <FormCheckLabel htmlFor={`rating_${i + 1}`}>{i + 1}</FormCheckLabel>
        <Field
          name="rating"
          component={AdaptedRadio}
          type="radio"
          id={`rating_${i + 1}`}
          value={`${i + 1}`}
        />
      </React.Fragment>
    );
    list.push(item);
  }
  return list;
};

export default RadioButtonList;
