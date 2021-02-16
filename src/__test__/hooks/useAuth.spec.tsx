import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/modules/AuthContext';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able make sing in', async () => {
    const user = {
      id: 'user-123',
      name: 'John doe hahahaah',
      email: 'johndoe@example.com.br',
    };
    const token = 'token-123';
    apiMock.onPost('sessions').reply(200, {
      user,
      token,
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      token,
      user,
    });

    await waitForNextUpdate();

    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      ['@Gobarber:token', token],
      ['@Gobarber:user', JSON.stringify(user)],
    ]);
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore saved data from storage when auth inits', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should be able to sign out', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    await waitForNextUpdate();

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
      '@Gobarber:token',
      '@Gobarber:user',
    ]);

    expect(result.current.user).toBeUndefined();
  });
});
