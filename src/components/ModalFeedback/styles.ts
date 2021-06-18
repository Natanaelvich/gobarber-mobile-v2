import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

type ModalProps = {
  type: string;
};

export const Container = styled.View``;
export const CardModal = styled.View<ModalProps>`
  background: #fff;
  border-radius: 6px;
  padding: 12px;
  elevation: 2;
  border-left-width: 8px;
  border-left-color: ${props =>
    props.type === 'success' ? '#87c981' : '#EC5870'};
  align-items: center;
  flex-direction: row;
  position: relative;
`;
export const IconChecked = styled(MaterialIcons).attrs((props: ModalProps) => ({
  size: 56,
  name: props.type === 'success' ? 'check-circle' : 'close',
  color: props.type === 'success' ? '#87c981' : '#EC5870',
}))<ModalProps>``;
export const IconClose = styled(MaterialIcons).attrs({
  size: 18,
  name: 'close',
  color: '#666',
})``;
export const ContainerText = styled.View`
  justify-content: center;
  margin-left: 12px;
`;
export const TitleModal = styled.Text`
  line-height: 20px;
  color: #333333;
  letter-spacing: 2.89px;
  font-size: 16px;
  margin-bottom: 3px;
`;
export const TextModal = styled.Text`
  color: #666;
  font-size: 14px;
`;
export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  top: 12px;
`;
