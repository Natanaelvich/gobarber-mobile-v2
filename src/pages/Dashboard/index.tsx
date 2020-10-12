import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'expo-vector-icons';
import { FlatListProps } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../hooks/modules/AuthContext';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      navigation.navigate('AppointmentDatePicker', { providerId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => navigation.navigate('Profile')}>
          <UserAvatar
            source={{
              uri:
                user.avatar_url ||
                `https://api.adorable.io/avatars/300/${user.name}@adorable.png`,
            }}
          />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider: Provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabelereiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => handleSelectProvider(provider.id)}>
            <ProviderAvatar
              source={{
                uri:
                  provider.avatar_url ||
                  `https://api.adorable.io/avatars/200/${provider.name}@adorable.png`,
              }}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <MaterialCommunityIcons
                  name="calendar"
                  size={14}
                  color="#ff9000"
                />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <MaterialCommunityIcons
                  name="clock"
                  size={14}
                  color="#ff9000"
                />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
