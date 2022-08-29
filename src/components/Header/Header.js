import React from 'react';
import {
  Cabecalho,
  Container,
  Li,
  Logo,
  Nav,
  NavContainer,
  NavTitle,
  Ul,
} from './styleHeader';
import LogoImg from '../../assets/picwish.png';

const Header = () => {
  return (
    <>
    <Container>

        <Logo src={LogoImg} />
        <Cabecalho>
        <Nav nav="nav-superior">
          <Ul nav="nav-superior">
            <Li nav="nav-superior">Ajuda</Li>
            <Li nav="nav-superior">Dúvidas Frequentes</Li>
            <Li nav="nav-superior">Mapa do Site</Li>
            <Li nav="nav-superior">Fale Conosco</Li>
          </Ul>
        </Nav>
        <NavTitle>DIVISÃO DE REFERÊNCIA DA PESSOA DESAPARECIDA</NavTitle>
      </Cabecalho>
    </Container>
      <Nav>
        <Ul>
          <Li>A Campanha</Li>
          <Li>Como Ajudar</Li>
          <Li>Como prevenir</Li>
          <Li>Álbum de fotos</Li>
          <Li>Cadastro</Li>
          <Li>Notícias</Li>
        </Ul>
      </Nav>
    </>
  );
};

export default Header;
