import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;
export const Button = styled(RectButton)`
  background: #ff9000;
  border-radius: 10px;
  height: 50px;
  width: 100%;

  align-items: center;
  justify-content: center;
`;
export const ButtonText = styled.Text`
  font-family: RobotoSlab_500Medium;
  font-size: 14px;
  line-height: 18px;

  color: #312e38;
`;
