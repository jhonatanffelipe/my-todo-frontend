import React, { useCallback, useState } from "react";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import * as Yup from "yup";

import { Background, BackgroundImg, Container, Content, LogoImg, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import backgroundImg from "../../assets/img-background.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { IFormErrors } from "../../interfaces/IFormErrors";
import getValidationError from "../../utils/getValidationErros";
import { useToast } from "../../hooks/toast";
import { forgotPassword } from "../../services/password/forgotPassword";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErros] = useState<IFormErrors>({});
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setFormErros({});

    try {
      const data = {
        email,
      };

      const schema = Yup.object().shape({
        email: Yup.string().required("E-mail obrigatório").email("Informe um e-mail válido"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await forgotPassword({ email }).then(() => {
        addToast({
          type: "success",
          title: "Recuperação de senha enviada com sucesso",
          description: "Verifique sua caixa de entrada",
        });
      });
    } catch (err: Yup.ValidationError | any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        setFormErros(errors);
        return;
      }

      addToast({
        type: "error",
        title: "Ocorreu um erro ao requisitar recuperação de senha",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, email]);
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

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              error={formErrors.email}
              onChange={e => setEmail(e.target.value)}
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

export { ForgotPassword };
