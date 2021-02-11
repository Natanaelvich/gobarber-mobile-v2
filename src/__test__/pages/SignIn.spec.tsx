import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SingnIn from '../../pages/SingnIn';
import api from '../../services/api';

const mockedSignIn = jest.fn();
const apiMock = new MockAdapter(api);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
    useRef: jest.fn(),
  };
});

jest.mock('../../hooks/modules/AuthContext.tsx', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('moti');
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

  it('Should contains email/password inputs', async () => {
    const { getByPlaceholderText } = render(<SingnIn />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('Should be able to sing in', async () => {
    mockedSignIn.mockImplementation(({ email, password }) => {});

    const { getByPlaceholderText, getByText } = render(<SingnIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith({
        email: 'johndoe@example.com',
        password: '123456',
      });
    });
  });

  it('Should not be able to sing in with inputs emptys', async () => {
    const { getByPlaceholderText, getByText } = render(<SingnIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, '');
    fireEvent.changeText(passwordField, '');

    fireEvent.press(buttonElement);

    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it('Should be able to see error in erros sing in fetch ', async () => {
    apiMock.onPut('sessions').reply(401);
    const { getByPlaceholderText, getByText } = render(<SingnIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    expect(mockedSignIn).not.toHaveBeenCalled();
  });
});
