import React from "react";
import { FiArrowLeft, FiLock, FiUnlock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  return (
    <Container>
      <Background>
        <BackgroundImg src={backgroundImg} />
      </Background>

      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form action="">
            <h1>Alterar senha</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" error="" />

            <Input name="confirmPassword" icon={FiUnlock} type="password" placeholder="Confirmar enha" error="" />

            <Button type="submit">Confirmar</Button>
          </form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para tela de login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export { ResetPassword };
