import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import {
  withReanimatedTimer,
  moveAnimationByTime,
} from 'react-native-reanimated/src/reanimated2/jestUtils';

import SingnIn from '../../pages/SingnIn';
import api from '../../services/api';

const user = {
  id: 'id-user',
  email: 'johndoe@example.com',
  name: 'johndoe',
  avatar_url: 'avatar-url',
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
    }),
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

  // it('Should be able to sing in', async () => {
  //   apiMock.onPost('sessions').reply(200, user);
  //   mockedSignIn.mockImplementation(({ email, password }) => {
  //     return { email, password };
  //   });

  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, 'johndoe@example.com');
  //   fireEvent.changeText(passwordField, '123456');

  //   fireEvent.press(buttonElement);

  //   await waitFor(() => {
  //     expect(mockedSignIn).toHaveBeenCalledWith(user);
  //   });
  // });

  // it('Should not be able to sing in with inputs emptys', async () => {
  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, '');
  //   fireEvent.changeText(passwordField, '');

  //   fireEvent.press(buttonElement);

  //   expect(mockedSignIn).not.toHaveBeenCalled();
  // });

  // it('Should be able to see error "E-mail ou senha incorretos" in erros sing in 401 fetch ', async () => {
  //   apiMock.onPost('sessions').reply(401);

  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, 'johndoe@example.com');
  //   fireEvent.changeText(passwordField, '123456');

  //   fireEvent.press(buttonElement);

  //   await waitFor(() => {
  //     expect(getByText('E-mail ou senha incorretos')).toBeTruthy();
  //   });
  // });

  // it('Should be able to see error "Erro ao buscar macros, problemas no servidor ⚠" in erros sing in 500 fetch ', async () => {
  //   apiMock.onPost('sessions').reply(500);

  //   // mockedSignIn.mockImplementation(({ email, password }) => {
  //   //   throw new Error('');
  //   // });
  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, 'johndoe@example.com');
  //   fireEvent.changeText(passwordField, '123456');

  //   fireEvent.press(buttonElement);

  //   await waitFor(() => {
  //     expect(
  //       getByText('Erro ao buscar macros, problemas no servidor ⚠'),
  //     ).toBeTruthy();
  //   });
  // });

  // it('Should be able to see error "Falha de conexão, verifique sua internet e tente novamente" in erros sing in Network Error fetch ', async () => {
  //   apiMock.onPost('sessions').reply(200, user);
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error('Network Error');
  //   });
  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, 'johndoe@example.com');
  //   fireEvent.changeText(passwordField, '123456');

  //   fireEvent.press(buttonElement);

  //   await waitFor(() => {
  //     expect(
  //       getByText('Falha de conexão, verifique sua internet e tente novamente'),
  //     ).toBeTruthy();
  //   });
  // });

  // it('Should be able to see error "Falha no login, verifique suas credenciais e tente novamente!" in erros sing', async () => {
  //   apiMock.onPost('sessions').reply(200, user);
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error();
  //   });
  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.changeText(emailField, 'johndoe@example.com');
  //   fireEvent.changeText(passwordField, '123456');

  //   fireEvent.press(buttonElement);

  //   await waitFor(() => {
  //     expect(
  //       getByText(
  //         'Falha no login, verifique suas credenciais e tente novamente!',
  //       ),
  //     ).toBeTruthy();
  //   });
  // });

  // it('Should be able to onSubmitEditing input email', async () => {
  //   const { getByPlaceholderText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');

  //   const testText = 'Submitted text';
  //   fireEvent(emailField, 'onSubmitEditing', {
  //     nativeEvent: { text: testText },
  //   });

  //   expect(mockedSignIn).not.toHaveBeenCalled();
  // });

  // it('Should be able to sing in when onSubmitEditing input password', async () => {
  //   apiMock.onPost('sessions').reply(200, user);
  //   mockedSignIn.mockImplementation(({ email, password }) => {
  //     return { email, password };
  //   });
  //   const { getByPlaceholderText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');

  //   fireEvent.changeText(emailField, 'johndoe@example.com');
  //   fireEvent.changeText(passwordField, '123456');

  //   fireEvent(passwordField, 'onSubmitEditing');

  //   await waitFor(() => {
  //     expect(mockedSignIn).toHaveBeenCalled();
  //   });
  // });

  // it('Should be able to navigate to Signup Page', async () => {
  //   mockedNavigate.mockImplementation(route => {
  //     return route;
  //   });
  //   const { getByText } = render(<SingnIn />);

  //   const buttonElement = getByText('Criar uma conta');

  //   fireEvent.press(buttonElement);

  //   expect(mockedNavigate).toHaveBeenCalledWith('SingnUp');
  // });
});
