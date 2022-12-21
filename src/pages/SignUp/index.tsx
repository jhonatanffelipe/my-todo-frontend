import React from "react";
import { FiUser, FiArrowLeft, FiMail, FiLock, FiUnlock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background>
        <BackgroundImg src={backgroundImg} />
      </Background>

      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form action="">
            <h1>Crie sua conta</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Input name="confirmPassword" icon={FiUnlock} type="password" placeholder="Confirmar enha" />

            <Button type="submit">Confirmar</Button>
          </form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
