import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Button as ButtonStyle, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <ButtonStyle {...rest}>
      <ButtonText>{title}</ButtonText>
    </ButtonStyle>
  );
};

export default Button;
