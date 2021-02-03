import React, { useMemo, useCallback } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { MaterialCommunityIcons } from 'expo-vector-icons';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(
      params.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, [params.date]);

  const handleOk = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Dashboard',
        },
      ],
    });
  }, [navigation]);

  return (
    <Container>
      <MaterialCommunityIcons name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOk}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
