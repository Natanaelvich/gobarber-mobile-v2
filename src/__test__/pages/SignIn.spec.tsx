import React from 'react';
import { render } from '@testing-library/react-native';
import SingnIn from '../../pages/SingnIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn page', () => {
  it('Should contains email/password inputs', () => {
    const { getByPlaceholderText } = render(<SingnIn />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
