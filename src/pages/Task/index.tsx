import React, { useCallback, useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { IFormErrors } from "../../interfaces/IFormErrors";

import { Container, Content, Checkbox, CategorySession, Category } from "./styles";

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";

interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}

const Task: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [conclued, setConclued] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErros] = useState<IFormErrors>({});
  const { singOut } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

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

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setFormErros({});

    try {
      console.log({
        categoryId,
        title,
        description,
        date,
        hour,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, title, description, date, hour]);

  useEffect(() => {
    void handleRequestCategories();
  }, [handleRequestCategories]);

  return (
    <Container>
      <Content>
        <CategorySession>
          {categories.map(category => (
            <Category
              type="button"
              key={category.id}
              onClick={() => setCategoryId(category.id)}
              selected={category.id === categoryId}
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

          <Input type="date" value={date} onChange={e => setDate(e.target.value)} error={formErrors.date} />

          <Input type="time" value={hour} onChange={e => setHour(e.target.value)} error={formErrors.hour} />

          <div className="conclued-delete">
            <Checkbox selected={conclued} onClick={() => setConclued(!conclued)}>
              <div>{conclued && <FiCheck />}</div>
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
