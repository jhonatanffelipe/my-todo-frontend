import React from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <LogoImg src={logoImg} alt="" />

        <form action="">
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

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
