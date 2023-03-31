import React, { useCallback, useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { IFormErrors } from "../../interfaces/IFormErrors";
import moment from "moment";

import { Container, Content, Checkbox, CategorySession, Category } from "./styles";

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

import { useToast } from "../../hooks/toast";
import getValidationError from "../../utils/getValidationErros";
import { AppError } from "../../utils/errors/AppError";

interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}

const Task: React.FC = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [done, setDone] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const { singOut } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRequestCategories = useCallback(async () => {
    await api
      .get("/categories")
      .then(response => {
        setCategories(response.data);
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
      });
  }, [addToast, navigate, singOut]);

  const handleRequesTask = useCallback(async () => {
    const taskId = location.pathname.replace("/task", "").replace("/", "");

    setId(taskId);

    if (taskId) {
      api
        .get(`/tasks/${taskId}`)
        .then(response => {
          setCategoryId(response.data.categoryId);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDate(moment(response.data.when).format("YYYY-MM-DD"));
          setHour(moment(response.data.when).format("HH:mm:00"));
          setDone(response.data.done);
        })
        .catch(error => {
          if (error.response.status === 401) {
            singOut();
            navigate("/");
          }

          addToast({
            type: "error",
            title: "Erro ao encontrar tarefa.",
            description: error?.message ? error?.message : error.response.data.message,
          });
        });
    }
  }, [addToast, navigate, singOut, location.pathname]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setFormErrors({});
    try {
      const data = {
        categoryId,
        title,
        description,
        date,
        hour,
      };

      if (!categoryId) {
        throw new AppError("Categoria obrigatória");
      }

      const schema = Yup.object().shape({
        categoryId: Yup.string().required("Categoria obrigatória"),
        title: Yup.string().required("Título obrigatório"),
        description: Yup.string().required("Descrição obrigatório"),
        date: Yup.string().required("Data obrigatória"),
        hour: Yup.string().required("Hora obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/tasks/${id}`, {
          categoryId,
          title,
          description,
          when: moment(`${date} ${hour}`).format("yyyy-MM-DD HH:mm:ss.000"),
          done,
        });

        addToast({
          type: "success",
          title: "Atividade atualizada com sucsso",
        });
      } else {
        await api.post("/tasks", {
          categoryId,
          title,
          description,
          when: moment(`${date} ${hour}`).format("yyyy-MM-DD HH:mm:ss.000"),
          done,
        });

        addToast({
          type: "success",
          title: "Atividade criada com sucsso",
        });
      }

      navigate("/");
    } catch (error: Yup.ValidationError | any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error);
        setFormErrors(errors);
        return;
      }

      addToast({
        type: "error",
        title: "Erro na tentar criar/alterar atividade",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, [categoryId, title, description, date, hour, done, addToast, navigate, id]);

  useEffect(() => {
    void handleRequestCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void handleRequesTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Content>
        <CategorySession>
          {categories.map(category => (
            <Category
              type="button"
              key={category.id}
              onClick={() => setCategoryId(category.id)}
              selected={category.id === categoryId || !categoryId}
            >
              <img src={category.imageUrl} alt={category.name} />
            </Category>
          ))}
        </CategorySession>
        <form>
          <Input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} error={formErrors.title} />

          <TextArea
            value={description}
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)}
            error={formErrors.description}
          ></TextArea>

          <Input
            type="date"
            pattern="DD/MM/yyyy"
            value={date}
            onChange={e => setDate(e.target.value)}
            error={formErrors.date}
          />

          <Input type="time" value={hour} onChange={e => setHour(e.target.value)} error={formErrors.hour} />

          <div className="done-delete">
            <Checkbox selected={done} onClick={() => setDone(!done)}>
              <div>{done && <FiCheck />}</div>
              <span>
                <strong>Concluído</strong>
              </span>
            </Checkbox>

            <button type="button">
              <strong>Excluir</strong>
            </button>
          </div>

          <Button type="button" onClick={handleSubmit} loading={loading}>
            Confirmar
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export { Task };
