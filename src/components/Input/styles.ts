import styled, { css } from 'styled-components/native';
import { Feather } from 'expo-vector-icons';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
}
interface IconProps {
  icon: string;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;

  flex-direction: row;
  align-items: center;

  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 8px;
  border-width: 1px;
  border-color: transparent;

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;
export const TextInput = styled.TextInput`
  color: #f4ede8;
  font-family: RobotoSlab_400Regular;
  flex: 1;
  margin-left: 016px;
`;
