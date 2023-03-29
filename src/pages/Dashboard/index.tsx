import React, { useState } from "react";

import { Container, Content, FilterSession } from "./styles";
import { FilterCard } from "../../components/FilterCard";

const Dashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("day");

  return (
    <Container>
      <Content>
        <FilterSession>
          <FilterCard title="Dia" onClick={e => setSelectedFilter("day")} selected={selectedFilter === "day"} />
          <FilterCard title="Semana" onClick={e => setSelectedFilter("week")} selected={selectedFilter === "week"} />
          <FilterCard title="Mês" onClick={e => setSelectedFilter("month")} selected={selectedFilter === "month"} />
          <FilterCard title="Ano" onClick={e => setSelectedFilter("year")} selected={selectedFilter === "year"} />
        </FilterSession>
      </Content>
    </Container>
  );
};

export { Dashboard };
