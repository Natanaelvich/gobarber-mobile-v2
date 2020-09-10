import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})`
  background: #312e38;
`;
export const Title = styled.Text`
  margin: 64px 0 24px;
  font-family: RobotoSlab_500Medium;
  font-size: 24px;
  line-height: 26px;
  color: #f4ede8;
`;
