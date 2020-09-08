import React from 'react';

import { Container, Logo, Title } from './styles';

import logo from '../../assets/Logo.png';

const SingnIn: React.FC = () => {
  return (
    <Container>
      <Logo source={logo} />
      <Title>Faça seu logon</Title>
    </Container>
  );
};

export default SingnIn;
