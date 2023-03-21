import React, { useCallback, useEffect, useState } from "react";
import { FiCamera, FiLock, FiMail, FiUnlock, FiUser } from "react-icons/fi";
import * as Yup from "yup";

import { Container, Form, ImageContainer } from "./styles";
import { Input } from "../../components/Input";
import { IFormErrors } from "../../interfaces/IFormErrors";
import { Button } from "../../components/Button";
import getValidationError from "../../utils/getValidationErros";
import { useToast } from "../../hooks/toast";
import { showProfile } from "../../services/user/showProfile";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const { addToast } = useToast();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setFormErrors({});

    try {
      const data = {
        name,
        email,
        currentPassword,
        password,
        confirmPassword,
      };

      const schema = Yup.object().shape({
        currentPassword: Yup.string().required("Senha atual obrigatória"),
        password: Yup.string().required("Senha obrigatória"),
        confirmPassword: Yup.string()
          .required("Confirmação de senha obrigatória")
          .oneOf([Yup.ref("password")], "Senhas devem ser iguais"),
      });

      await schema.validate(data, {
        abortEarly: false,
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
  }, [name, email, currentPassword, password, confirmPassword, addToast]);

  const handleLoadProfile = useCallback(async () => {
    await showProfile().then(reponse => {
      setName(reponse.name);
      setEmail(reponse.email);
      setAvatar(reponse.avatar);
    });
  }, []);

  useEffect(() => {
    void handleLoadProfile();
  }, [handleLoadProfile]);

  return (
    <Container>
      <ImageContainer>
        <div>
          <img src={avatar} alt={name} />
        </div>
        <button>
          <FiCamera />
        </button>
      </ImageContainer>

      <Form>
        <h2>Meu perfil</h2>

        <div>
          <Input
            value={name}
            name="name"
            icon={FiUser}
            placeholder="Nome"
            error={formErrors.name}
            onChange={e => setName(e.target.value)}
          />

          <Input
            value={email}
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            error={formErrors.email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Input
            name="currentPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            error={formErrors.currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            autoComplete="off"
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
        </div>

        <Button type="button" loading={loading} onClick={handleSubmit} size={340}>
          Confirmar
        </Button>
      </Form>
    </Container>
  );
};

export { Profile };
