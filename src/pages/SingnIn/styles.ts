import styled from 'styled-components/native';

export const Container = styled.View`
  background: #312e38;
  flex: 1;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`;
export const Form = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 100%;
  flex: 1;
`;
export const Logo = styled.Image``;
export const Title = styled.Text`
  margin: 64px 0 24px;
  font-family: RobotoSlab_500Medium;
  font-size: 24px;
  line-height: 26px;
  color: #f4ede8;
`;
export const ForgotPassword = styled.Text`
  margin-top: 24px;
  font-family: RobotoSlab_400Regular;
  font-size: 14px;
  line-height: 18px;
  color: #f4ede8;
`;
export const CreateAccountContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-top-width: 1px;
  border-color: #000;
`;
export const CreateAccountText = styled.Text`
  font-family: RobotoSlab_500Medium;
  font-size: 14px;
  line-height: 18px;
  margin-left: 18px;

  color: #ff9000;
`;
