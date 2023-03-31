import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FiCamera, FiLock, FiMail, FiUnlock, FiUser } from "react-icons/fi";
import * as Yup from "yup";

import { Container, Form, ImageContainer } from "./styles";
import { Input } from "../../components/Input";
import { IFormErrors } from "../../interfaces/IFormErrors";
import { Button } from "../../components/Button";
import getValidationError from "../../utils/getValidationErros";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { IAuthUser } from "../../interfaces/IAuthUser";
import api from "../../services/api";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const navigate = useNavigate();
  const { singOut, setData, token } = useAuth();
  const { addToast } = useToast();

  const handleRequestShowProfile = useCallback(async () => {
    await api
      .get("/users/profile")
      .then(response => {
        const user: IAuthUser = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          avatarUrl: response.data.avatarUrl,
        };

        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatarUrl);

        localStorage.setItem("@MyTodo:user", JSON.stringify(user));

        setData({ token, user });
      })
      .catch(error => {
        if (error.response.status === 401) {
          singOut();
          navigate("/");
        }

        addToast({
          type: "error",
          title: "Erro ao listar dados do usuário.",
          description: error.response.data.message,
        });
      });
  }, [token, addToast, navigate, singOut, setData]);

  const handleAvatarChenge = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        setLoading(true);
        await api
          .patch("/users/avatar", data)
          .then(async () => {
            await handleRequestShowProfile();

            addToast({
              type: "success",
              title: "Avatar atualizado.",
            });
          })
          .catch(error => {
            if (error.response.status === 401) {
              singOut();
              navigate("/");
            }

            addToast({
              type: "error",
              title: "Erro ao atualizar perfil do usuário.",
              description: error.response.data.message,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [navigate, addToast, singOut, handleRequestShowProfile],
  );

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

      let schema;

      if (data.currentPassword ?? data.password ?? data.confirmPassword) {
        schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string().required("E-mail obrigatório").email("Informe um e-mail válido"),
          currentPassword: Yup.string().required("Senha atual obrigatória"),
          password: Yup.string().min(6, "Deve conter no mínimo 6 dígito"),
          confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Senhas devem ser iguais"),
        });
      } else {
        schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string().required("E-mail obrigatório").email("Informe um e-mail válido"),
        });
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      await api
        .put("/users", {
          name,
          email,
          currentPassword,
          password,
          confirmPassword,
        })
        .then(async () => {
          await handleRequestShowProfile();

          addToast({
            type: "success",
            title: "Usuário atualizado com sucesso",
          });

          setCurrentPassword("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch(error => {
          if (error.response.status === 401) {
            singOut();
            navigate("/");
          }

          addToast({
            type: "error",
            title: "Erro na tentar alterar usuário",
            description: error.response.data.message,
          });
        });
    } catch (error: Yup.ValidationError | any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error);
        setFormErrors(errors);
        return;
      }

      addToast({
        type: "error",
        title: "Erro na tentar alterar usuário",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, [name, email, currentPassword, password, confirmPassword, navigate, singOut, addToast, handleRequestShowProfile]);

  useEffect(() => {
    void handleRequestShowProfile();
  }, [handleRequestShowProfile]);

  return (
    <Container>
      <ImageContainer>
        <div>
          <img src={avatar} alt={name} />
        </div>
        <label>
          <FiCamera />
          <input type="file" id="avatar" onChange={handleAvatarChenge} accept="image/*"></input>
        </label>
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
            value={currentPassword}
            name="currentPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
            error={formErrors.currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />

          <Input
            value={password}
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
            error={formErrors.password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="off"
          />

          <Input
            value={confirmPassword}
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
