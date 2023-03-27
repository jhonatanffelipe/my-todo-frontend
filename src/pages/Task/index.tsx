import React, { useCallback, useState } from "react";
import { FiCheck } from "react-icons/fi";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { IFormErrors } from "../../interfaces/IFormErrors";

import { Container, Content, Checkbox } from "./styles";

const Task: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [conclued, setConclued] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErros] = useState<IFormErrors>({});

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setFormErros({});

    try {
      console.log({
        title,
        description,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [title, description]);

  return (
    <Container>
      <Content>
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
