import React from 'react';

import { Container, Title } from './styles';
import { Button } from '../../components/Button/styles';
import { useAuth } from '../../hooks/modules/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Title>Dashboard</Title>
      <Button onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
