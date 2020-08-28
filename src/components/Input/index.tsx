import { useField } from '@unform/core';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { Container, ErrorMessage, Icon, TextInput } from './styles';
import { colors } from '../../styles/colors';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  // Cadastrando o input no formulário
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFielld, setIsFielld] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFielld(!!inputValueRef.current.value);
  }, []);

  // Dando focus do input a partir da ref (passando o metodo focus do componente filho para pai)
  // Injetando no componente o método focus() través da ref
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  // Registrando input assim que o mesmo é carregado em tela
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // Preenchendo input
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      // Limpando input
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}
      >
        <Icon
          name={icon}
          size={17}
          color={isFocused || isFielld ? colors.primary : colors.secondary}
        />
        <TextInput
          {...rest}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={colors.secondary}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
        />
      </Container>
      {error && (
        <ErrorMessage style={{ paddingBottom: 10 }}>{error}</ErrorMessage>
      )}
    </>
  );
};

export default forwardRef(Input);
