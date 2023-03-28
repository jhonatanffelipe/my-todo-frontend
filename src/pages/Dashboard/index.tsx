import React from "react";

import { Container, Content, FilterSession, FilterCard } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <FilterSession>
          <FilterCard></FilterCard>
          <FilterCard></FilterCard>
          <FilterCard></FilterCard>
          <FilterCard></FilterCard>
        </FilterSession>
      </Content>
    </Container>
  );
};

export { Dashboard };
