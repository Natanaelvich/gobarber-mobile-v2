import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import api from '../../services/api';
import Dashboard from '../../pages/Dashboard';

const provider = {
  id: 'id-provider',
  name: 'name-provider',
  avatar_url: null,
};

const mockedSignIn = jest.fn();
const mockedNavigate = jest.fn();
const apiMock = new MockAdapter(api);

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRef: jest.fn(),
  };
});

jest.mock('../../hooks/modules/AuthContext.tsx', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
      user: {
        id: 'id-user',
        email: 'johndoe@example.com',
        name: 'johndoe',
        avatar_url: 'avatar-url',
      },
    }),
  };
});

jest.mock('react-native-reanimated', () => {
  return {
    NativeReanimated: jest.fn(),
    createAnimatedComponent: jest.fn(),
  };
});

describe('SignIn page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
  });

  it('Should be able to see providers availables', async () => {
    apiMock.onGet('providers').reply(200, [provider]);
    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('name-provider')).toBeTruthy();
    });
  });

  it('Should be able to see empty providers component', async () => {
    apiMock.onGet('providers').reply(200, []);
    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('Não existe cabeleleiros ainda 😅 !')).toBeTruthy();
    });
  });

  it('Should be able to see error on get providers', async () => {
    apiMock.onGet('providers').reply(500, []);
    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(
        getByText(
          'Problemas ao buscar cabeleleiros 😞, tente novamente mais tarde!',
        ),
      ).toBeTruthy();
    });
  });

  it('Should be able to going profile page', async () => {
    apiMock.onGet('providers').reply(200, []);
    mockedNavigate.mockImplementation(route => route);

    const { getByText } = render(<Dashboard />);

    const headerElement = getByText('johndoe');

    fireEvent.press(headerElement);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Profile');
    });
  });

  it('Should be able to going appointment date picker to select provider', async () => {
    apiMock.onGet('providers').reply(200, [provider]);
    mockedNavigate.mockImplementation(route => route);

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      const headerElement = getByText('name-provider');

      fireEvent.press(headerElement);
      expect(mockedNavigate).toHaveBeenCalledWith('AppointmentDatePicker', {
        providerId: 'id-provider',
      });
    });
  });
});
