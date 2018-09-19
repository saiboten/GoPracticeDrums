import React from 'react';
import { Field } from 'react-final-form';
import {
  FormCheckLabel,
  Radio,
} from '@smooth-ui/core-em';
import styled from 'react-emotion';

const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />;

const AdaptedRadio = adapt(Radio);

const OuterWrapper = styled('div')`
  display: inline-block;
`;

const InnerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :nth-child(2) {
    padding-left: 5px;
  }
`;

const RadioButtonList = () => {
  const list = [];

  for (let i = 0; i < 10; i++) {
    const item = (
      <OuterWrapper key={i + 1}>
        <InnerWrapper>
          <FormCheckLabel htmlFor={`rating_${i + 1}`}>{i + 1}</FormCheckLabel>
          <Field
            name="rating"
            component={AdaptedRadio}
            type="radio"
            id={`rating_${i + 1}`}
            value={`${i + 1}`}
          />
        </InnerWrapper>
      </OuterWrapper>
    );
    list.push(item);
  }
  return list;
};

export default RadioButtonList;
