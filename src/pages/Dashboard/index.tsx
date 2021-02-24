import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../hooks/modules/AuthContext';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersEmptyContainer,
  ProvidersEmptyTitle,
} from './styles';
import getAvatarUrl from '../../utils/getAvatarUrl';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

export interface ProviderList {
  item: Provider;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingGetProviders, setLoadingGetProviders] = useState(false);

  useEffect(() => {
    async function getProviders(): Promise<void> {
      try {
        setLoadingGetProviders(true);
        const response = await api.get('providers');
        setProviders(response.data);
      } catch (error) {
        setErrorMessage(
          'Problemas ao buscar cabeleleiros 😞, tente novamente mais tarde!',
        );
      } finally {
        setLoadingGetProviders(false);
      }
    }

    getProviders();
  }, []);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      navigation.navigate('AppointmentDatePicker', { providerId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header onPress={() => navigation.navigate('Profile')}>
        <BorderlessButton>
          <HeaderTitle>
            Bem vindo, {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>
        </BorderlessButton>

        <UserAvatar
          source={{
            uri:
              getAvatarUrl(user.avatar_url) ||
              `https://www.gravatar.com/avatar/${user.id}`,
          }}
        />
      </Header>
      {providers.length > 0 ? (
        <ProvidersList
          data={providers}
          keyExtractor={(provider: Provider) => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle>Cabelereiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }: ProviderList) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar
                source={{
                  uri:
                    getAvatarUrl(provider.avatar_url) ||
                    `https://www.gravatar.com/avatar/${provider.id}`,
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
      ) : (
        <ProvidersEmptyContainer>
          {loadingGetProviders ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              animating={loadingGetProviders}
            />
          ) : (
            <ProvidersEmptyTitle>
              {errorMessage || 'Não existe cabeleleiros ainda 😅 !'}
            </ProvidersEmptyTitle>
          )}
        </ProvidersEmptyContainer>
      )}
    </Container>
  );
};

export default Dashboard;
