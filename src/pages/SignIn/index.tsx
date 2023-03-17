import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";

import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { IFormErrors } from "../../interfaces/IFormErrors";
import { useAuth } from "../../hooks/auth";
import getValidationError from "../../utils/getValidationErros";
import { useToast } from "../../hooks/toast";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErros] = useState<IFormErrors>({});

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    setFormErros({});

    try {
      const data = {
        email,
        password,
      };

      const schema = Yup.object().shape({
        email: Yup.string().required("E-mail obrigatório").email("Informe um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email,
        password,
      });
    } catch (err: Yup.ValidationError | any) {
      console.log(err);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        setFormErros(errors);
        return;
      }

      addToast({
        type: "error",
        title: "Erro na autenticação",
        description: "Ocorreu um erro ao fazer login, cheque as credênciais",
      });
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn, addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoImg src={logoImg} alt="" />

          <form>
            <h1>Faça seu login</h1>

            <Input
              icon={FiMail}
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={formErrors.email}
              autoComplete="username"
            />

            <Input
              icon={FiLock}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={formErrors.password}
              autoComplete="current-password"
            />

            <Button type="button" onClick={handleSubmit} loading={loading} size={340}>
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
