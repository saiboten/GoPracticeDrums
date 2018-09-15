import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Menu = styled('ul')`
    display: flex;
    justify-content: space-around;
`;

const MenuItem = styled('li')`

`;

export default function FullMenu() {
  return (
    <Menu>
      <MenuItem><Link to="/">Oversikt</Link></MenuItem>
      <MenuItem><Link to="/addpractice">Legg til øving</Link></MenuItem>
    </Menu>);
}
