import React from 'react';



import Header from '../../components/Header/Header';
// import RegisterMissing from '../../components/Register/RegisterMissing'
import RegisterUser from '../../components/Register/RegisterUser';
import { Container, Wrapper } from './styleCadastro';


const Cadastro = () => {

  return (
    <Container>
      <Header />
      <Wrapper>
        <RegisterUser/>
      </Wrapper>
    </Container>
  );
};

export default Cadastro;
