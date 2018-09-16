import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Menu = styled('div')`
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-start;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;

  &:active, &:visited {
    color: black;
  }

  &:hover {
    background-color: #bd4932;
    color: white;
  }
`;

export default function FullMenu() {
  return (
    <Menu>
      <StyleLink to="/">Oversikt</StyleLink>
      <StyleLink to="/addpractice">Legg til øving</StyleLink>
    </Menu>);
}
