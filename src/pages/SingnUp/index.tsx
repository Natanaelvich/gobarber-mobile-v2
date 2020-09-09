import React, { useRef, useCallback } from 'react';

import { Feather } from 'expo-vector-icons';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
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

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const hanleSignIn = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail valido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        console.log(email, password);

        // await signIn({ email, password });

        // addToast({
        //   type: 'success',
        //   title: 'logado com sucesso',
        // });

        // navigation.navigate('Dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          console.log(errors);
          formRef.current?.setErrors(errors);
        }

        // addToast({
        //   type: 'error',
        //   title: 'Erro no login',
        //   description: 'Verifique suas credenciais',
        // });
      }
    },
    [],
  );
  return (
    <Container>
      <FormContainer>
        <Form ref={formRef} onSubmit={hanleSignIn}>
          <Logo source={logo} />
          <Title>Faça seu cadastro</Title>
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
    </Container>
  );
};

export default SingnUp;
