import React, { useRef, useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/modules/AuthContext';

import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, Avatar } from './styles';
import getAvatarUrl from '../../utils/getAvatarUrl';
import ModalFeedback from '../../components/ModalFeedback';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

interface ModalOptions {
  visible: boolean;
  type?: string;
  title?: string;
  description?: string;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    visible: false,
    type: 'success',
    title: 'Sucesso',
    description: 'Operação realizada com sucesso.',
  });

  const handleSaveProfile = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setModalOptions({
        visible: true,
        title: 'Perfil atualizado!',
        description: 'Seu perfil foi atualizado',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

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
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <Avatar
              source={{
                uri:
                  getAvatarUrl(user.avatar_url) ||
                  `https://api.adorable.io/avatars/100/${user.name}@adorable.png`,
              }}
            />

            <View>
              <Title>Atualizar perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSaveProfile}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                containerStyle={{ marginTop: 16 }}
                ref={passwordInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => newPasswordInputRef.current?.focus()}
              />

              <Input
                ref={newPasswordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                title="Confirmar mudanças"
                onPress={() => formRef.current?.submitForm()}
              />
            </Form>
            <Button title="Sair" onPress={signOut} />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalFeedback
        type={modalOptions.type}
        setVisible={(visible: boolean) => setModalOptions({ visible })}
        visible={modalOptions.visible}
        title={modalOptions.title}
        description={modalOptions.description}
      />
    </>
  );
};

export default Profile;
