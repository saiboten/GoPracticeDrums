import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Menu = styled('ul')`
    display: flex;
    justify-content: space-around;
`;

const MenuItem = styled('li')`
  list-style-type: none;

  &:hover {
    background-color: red;
  }
`;

const StyleLink = styled(Link)`
  text-decoration: none;

  &:active, &:visited {
    color: black;
  }
`;

export default function FullMenu() {
  return (
    <Menu>
      <MenuItem><StyleLink to="/">Oversikt</StyleLink></MenuItem>
      <MenuItem><StyleLink to="/addpractice">Legg til øving</StyleLink></MenuItem>
    </Menu>);
}
