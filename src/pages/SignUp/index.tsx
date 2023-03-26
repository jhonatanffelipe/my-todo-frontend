import React, { useCallback, useState } from "react";
import { FiUser, FiArrowLeft, FiMail, FiLock, FiUnlock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { IFormErrors } from "../../interfaces/IFormErrors";
import getValidationError from "../../utils/getValidationErros";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    setLoading(false);
    setFormErrors({});

    try {
      const data = {
        name,
        email,
        password,
        confirmPassword,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().required("E-mail obrigatório").email("Informe um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
        confirmPassword: Yup.string()
          .required("Confirmação de senha obrigatória")
          .oneOf([Yup.ref("password")], "Senhas devem ser iguais"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api
        .post("/users", {
          name,
          email,
          password,
          confirmPassword,
        })
        .then(() => {
          navigate("/");
        });
    } catch (err: Yup.ValidationError | any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        setFormErrors(errors);
        return;
      }

      addToast({
        type: "error",
        title: "Erro na tentar alterar usuário",
        description: err.message,
      });
    } finally {
      setLoading(true);
    }
  }, [addToast, name, email, password, confirmPassword, navigate]);

  return (
    <Container>
      <Background>
        <BackgroundImg src={backgroundImg} />
      </Background>

      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form>
            <h1>Crie sua conta</h1>

            <Input
              name="name"
              icon={FiUser}
              placeholder="Nome"
              error={formErrors.name}
              onChange={e => setName(e.target.value)}
            />

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              error={formErrors.email}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              error={formErrors.password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
            />

            <Input
              name="confirmPassword"
              icon={FiUnlock}
              type="password"
              placeholder="Confirmar senha"
              error={formErrors.confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />

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
