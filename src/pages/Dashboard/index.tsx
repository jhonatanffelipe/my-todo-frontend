import React from "react";

import { Container, Content, Footer } from "./styles";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { Header } from "../../components/Header";

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  return (
    <Container>
      <Header />
      <Content>
        <h1>Dashboard</h1>
        <Button type="button" loading={false} onClick={singOut}>
          Sair
        </Button>
      </Content>

      <Footer></Footer>
    </Container>
  );
};

export { Dashboard };
