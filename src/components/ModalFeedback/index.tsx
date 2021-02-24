import React from 'react';

import {
  CardModal,
  TextModal,
  IconChecked,
  TitleModal,
  ContainerText,
  ButtonClose,
  IconClose,
} from './styles';
import ModalContainer from '../ModalContainer';

interface ModalFeedbackProps {
  visible: boolean;
  type?: string;
  title?: string;
  description?: string;
  setVisible: any;
}

const ModalFeedback: React.FC<ModalFeedbackProps> = ({
  visible,
  setVisible,
  title = 'Sucesso',
  description = 'Operação realizada com sucesso.',
  type = 'success',
}) => {
  return (
    <ModalContainer changeSetVisible={setVisible} visible={visible}>
      <CardModal type={type}>
        <IconChecked type={type} />
        <ContainerText>
          <TitleModal>{title}</TitleModal>
          <TextModal>{description}</TextModal>
        </ContainerText>

        <ButtonClose onPress={() => setVisible(false)}>
          <IconClose />
        </ButtonClose>
      </CardModal>
    </ModalContainer>
  );
};

export default ModalFeedback;
