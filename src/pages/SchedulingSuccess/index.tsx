import React from 'react';

import { Container, Title, SubTitle } from './styles';

const SignUpSuccess: React.FC = () => {
  return (
    <Container>
      <Title>Agendamento concluído</Title>
      <SubTitle>
        Terça, dia 14 de março de 2020 às 12:00h com Diego Fernandes
      </SubTitle>
    </Container>
  );
};

export default SignUpSuccess;
