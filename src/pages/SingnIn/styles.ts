import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})`
  background: #312e38;
`;
export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
export const LogoContainer = styled(Animated.View)``;
export const Logo = styled.Image``;
export const Title = styled.Text`
  margin: 64px 0 24px;
  font-family: RobotoSlab_500Medium;
  font-size: 24px;
  line-height: 26px;
  color: #f4ede8;
`;
export const ForgotPasswordButton = styled.TouchableWithoutFeedback``;
export const ForgotPassword = styled.Text`
  margin-top: 24px;
  font-family: RobotoSlab_400Regular;
  font-size: 14px;
  line-height: 18px;
  color: #f4ede8;
`;
export const CreateAccountContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-top-width: 1px;
  border-color: #232129;

  background: #312e38;
`;
export const CreateAccountText = styled.Text`
  font-family: RobotoSlab_500Medium;
  font-size: 14px;
  line-height: 18px;
  margin-left: 18px;

  color: #ff9000;
`;
export const ErrorLogin = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin: 12px 0;
  width: 80%;
`;
export const ErrorLoginText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #e04848;
  margin-left: 6px;
`;
