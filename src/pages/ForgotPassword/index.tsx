import React, { useState } from "react";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
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
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" error="" />

            <Button type="button" loading={loading} onClick={handleSubmit}>
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

export { ForgotPassword };
