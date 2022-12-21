import React from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form action="">
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="/"> Esquci minha senha</Link>
          </form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background>
        <BackgroundImg src={backgroundImg} />
      </Background>
    </Container>
  );
};

export default SignIn;
