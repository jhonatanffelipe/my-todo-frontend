import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";
import { useForm, SubmitHandler } from "react-hook-form";

import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface IInputs {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async data => {
    console.log(data);
  };

  console.log(watch("email"));

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form onSubmit={() => handleSubmit(onSubmit)}>
            <h1>Faça seu login</h1>

            <Input {...register("email")} icon={FiMail} placeholder="E-mail" />

            <Input {...register("password", { required: true })} icon={FiLock} type="password" placeholder="Senha" />

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
