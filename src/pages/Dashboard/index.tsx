import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";

import { Container, Content, FilterSession, Separator, Task, TaskBotton, TaskSession, TaskTop } from "./styles";
import { FilterCard } from "../../components/FilterCard";
import api from "../../services/api";
import ITask from "../../interfaces/ITask";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";

const Dashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("D");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const { singOut } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const now = useMemo(() => {
    return moment().format("yyyy-MM-DD HH:00:00.000");
  }, []);

  const handleRequestTasks = useCallback(async () => {
    setLoading(true);
    await api
      .get(`/tasks?date=${now}&type=${selectedFilter}`)
      .then(response => {
        setTasks(response.data);
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
  }, [now, selectedFilter, addToast, navigate, singOut]);

  useEffect(() => {
    void handleRequestTasks();
  }, [handleRequestTasks]);

  return (
    <Container>
      <Content>
        <FilterSession>
          <FilterCard title="Dia" onClick={e => setSelectedFilter("D")} selected={selectedFilter === "D"} />
          <FilterCard title="Semana" onClick={e => setSelectedFilter("W")} selected={selectedFilter === "W"} />
          <FilterCard title="Mês" onClick={e => setSelectedFilter("M")} selected={selectedFilter === "M"} />
          <FilterCard title="Ano" onClick={e => setSelectedFilter("Y")} selected={selectedFilter === "Y"} />
        </FilterSession>

        <Separator>
          <div>
            <span>Tarefas</span>
          </div>
        </Separator>

        {!loading ? (
          <TaskSession>
            {tasks.map(task => (
              <Task key={task.id} to={`/task/${task.id}`} done={task.done ? "true" : null}>
                <TaskTop>
                  <div>
                    <img src={task.category.imageUrl} alt={task.title} />
                  </div>
                  <strong>{task.title}</strong>
                </TaskTop>
                <TaskBotton>
                  <span>{moment(task.when).format("DD/MM/yyyy")}</span>
                  <span>
                    <strong>{moment(task.when).format("HH:mm")}</strong>
                  </span>
                </TaskBotton>
              </Task>
            ))}
          </TaskSession>
        ) : (
          <TaskSession>
            <h1>Carregando...</h1>
          </TaskSession>
        )}
      </Content>
    </Container>
  );
};

export { Dashboard };
