import React, { useState } from "react";
import { FiUser, FiArrowLeft, FiMail, FiLock, FiUnlock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(false);
  };
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

            <Input name="name" icon={FiUser} placeholder="Nome" error="" />

            <Input name="email" icon={FiMail} placeholder="E-mail" error="" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" error="" />

            <Input name="confirmPassword" icon={FiUnlock} type="password" placeholder="Confirmar senha" error="" />

            <Button type="button" loading={loading} onClick={handleSubmit} size={340}>
              Confirmar
            </Button>
          </form>

          <Link to="/">
            <FiArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export { SignUp };
