import React, { useCallback, useEffect, useState } from "react";
import { FiArrowLeft, FiLock, FiUnlock } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { IFormErrors } from "../../interfaces/IFormErrors";
import { useToast } from "../../hooks/toast";
import { resetPassword } from "../../services/password/resetPassword";
import getValidationError from "../../utils/getValidationErros";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const { addToast } = useToast();

  const navigate = useNavigate();

  const { search } = useLocation();

  const handleSubmit = useCallback(async () => {
    setLoading(false);
    setFormErrors({});

    try {
      const data = {
        password,
        confirmPassword,
      };

      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        confirmPassword: Yup.string()
          .required("Confirmação de senha obrigatória")
          .oneOf([Yup.ref("password")], "Senhas devem ser iguais"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await resetPassword({
        token,
        password,
        confirmPassword,
      }).then(() => {
        addToast({
          type: "success",
          title: "Senha alterada com sucesso",
          description: "Realize seu login",
        });

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
        title: "Erro ao tentar alterar senha",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, password, confirmPassword, navigate, token]);

  useEffect(() => {
    setToken(search.split("?token=")[1]);
  }, [search]);

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

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              error={formErrors.password}
              onChange={e => setPassword(e.target.value)}
            />

            <Input
              name="confirmPassword"
              icon={FiUnlock}
              type="password"
              placeholder="Confirmar enha"
              error={formErrors.confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <Button type="button" loading={loading} onClick={handleSubmit} size={340}>
              Confirmar
            </Button>
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
