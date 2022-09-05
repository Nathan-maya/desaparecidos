import React from 'react';



import Header from '../../components/Header/Header';
import Register from '../../components/Register/Register'
import { Container, Wrapper } from './styleCadastro';


const Cadastro = () => {

  return (
    <Container>
      <Header />
      <Wrapper>
        <Register/>
      </Wrapper>
    </Container>
  );
};

export default Cadastro;
