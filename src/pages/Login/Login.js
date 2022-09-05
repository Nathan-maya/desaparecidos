import React from 'react';
import {
  Container,
  ContainerForm,
  Forms,
  Input,
  Label,
  Link,
  Wrapper,
} from './style';
import Header from '../../components/Header/Header';

const Login = () => {
  return (
    <Container>
      <Header />
      <ContainerForm>
        <Wrapper
          // validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            username: '',
            passowrd: '',
          }}
          onSubmit={(values, { resetForm }) => {
            // handleClick(values);
            resetForm();
          }}
        >
          <Forms>
            <Label htmlFor="username">username: </Label>
            <Input name="username" type="text" />
            <Label htmlfor="password">password: </Label>
            <Input name="password" />

            <Link>Esqueceu a senha?</Link>
            <Link>Não tem uma conta? Crie uma!</Link>
          </Forms>
        </Wrapper>
      </ContainerForm>
    </Container>
  );
};

export default Login;
