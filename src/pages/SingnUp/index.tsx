import React, { useRef, useCallback, useState } from 'react';

import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
import { View as MotiView } from 'moti';

import {
  Container,
  Logo,
  Title,
  ReturnLoginContainer,
  ReturnLoginText,
  FormContainer,
} from './styles';

import logo from '../../assets/Logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';
import ModalFeedback from '../../components/ModalFeedback';

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const [modalOptions, setModalOptions] = useState({
    visible: false,
    type: 'success',
    title: 'Sucesso',
    description: 'Operação realizada com sucesso.',
  });

  const hanleSignIn = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail valido.'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Minimo de 6 digitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, password } = data;

        await api.post('users', { name, email, password });

        navigation.navigate('SingnIn');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);

          return;
        }

        setModalOptions({
          visible: true,
          title: 'Erro na atualização!',
          description: 'Seu perfil não foi atualizado',
          type: 'error',
        });
      }
    },
    [navigation],
  );
  return (
    <Container>
      <FormContainer>
        <MotiView
          from={{ top: -44 }}
          animate={{ top: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            scale: {
              type: 'spring',
              delay: 100,
            },
          }}
          style={{ alignItems: 'center' }}
        >
          <Logo source={logo} />
        </MotiView>
        <Title>Faça seu cadastro</Title>
        <Form ref={formRef} onSubmit={hanleSignIn}>
          <Input
            autoCapitalize="words"
            placeholder="Nome"
            name="name"
            icon="user"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Input
            ref={emailRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
            name="email"
            icon="mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <Input
            ref={passwordRef}
            secureTextEntry
            placeholder="Senha"
            name="password"
            textContentType="newPassword"
            icon="lock"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Button
            title="Cadastrar"
            onPress={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>

      <ModalFeedback
        type={modalOptions.type}
        setVisible={(visible: boolean) => {
          setModalOptions({ ...modalOptions, visible });
        }}
        visible={modalOptions.visible}
        title={modalOptions.title}
        description={modalOptions.description}
      />
    </Container>
  );
};

export default SingnUp;
