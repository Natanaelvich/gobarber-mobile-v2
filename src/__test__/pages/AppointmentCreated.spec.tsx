import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import AppointmentCreated from '../../pages/AppointmentCreated';

const mockedReset = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      reset: mockedReset,
    }),
    useRoute: () => ({
      params: {
        date: new Date('2021-02-14 23:16:22'),
      },
    }),
  };
});

describe('SignIn page', () => {
  it('Should be able see page appointment created', () => {
    const { getByText } = render(<AppointmentCreated />);

    expect(
      getByText('domingo, dia 14 de fevereiro de 2021 às 23:16h'),
    ).toBeTruthy();
  });

  it('Should be able navigate to Dashboard', () => {
    mockedReset.mockImplementation(options => options);

    const { getByText } = render(<AppointmentCreated />);

    const buttonElement = getByText('Ok');

    fireEvent.press(buttonElement);

    expect(mockedReset).toBeCalledWith({
      index: 0,
      routes: [
        {
          name: 'Dashboard',
        },
      ],
    });
  });
});
