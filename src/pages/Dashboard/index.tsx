import React, { useState } from "react";

import { Container, Content, FilterSession } from "./styles";
import { FilterCard } from "../../components/FilterCard";

const Dashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("D");

  return (
    <Container>
      <Content>
        <FilterSession>
          <FilterCard title="Dia" onClick={e => setSelectedFilter("D")} selected={selectedFilter === "D"} />
          <FilterCard title="Semana" onClick={e => setSelectedFilter("W")} selected={selectedFilter === "W"} />
          <FilterCard title="Mês" onClick={e => setSelectedFilter("M")} selected={selectedFilter === "M"} />
          <FilterCard title="Ano" onClick={e => setSelectedFilter("Y")} selected={selectedFilter === "Y"} />
        </FilterSession>
      </Content>
    </Container>
  );
};

export { Dashboard };
