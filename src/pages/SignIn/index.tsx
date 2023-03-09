import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(() => {
    console.log("AQUI");
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form>
            <h1>Faça seu login</h1>

            <Input icon={FiMail} placeholder="E-mail" error="" />

            <Input icon={FiLock} type="password" placeholder="Senha" error="" />

            <Button type="button" onClick={handleSubmit}>
              Entrar
            </Button>

            <Link to="forgot_password"> Esquci minha senha</Link>
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

export { SignIn };
