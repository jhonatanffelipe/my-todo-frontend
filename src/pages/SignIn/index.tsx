import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <LogoImg src={logoImg} alt="" />

        <form action="">
          <h1>Faça seu login</h1>

          <input placeholder="E-mail" />

          <input type="password" placeholder="Senha" />

          <button type="submit"> Entrar</button>

          <a href="#"> Esquci minha senha</a>
        </form>

        <a href="#">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background>
        <BackgroundImg src={backgroundImg} />
      </Background>
    </Container>
  );
};

export default SignIn;
