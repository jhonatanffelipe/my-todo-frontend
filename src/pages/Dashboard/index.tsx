import React from "react";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { Container } from "./styles";

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  return (
    <Container>
      <h1>Dashboard</h1>
      <Button type="button" onClick={singOut}>
        Sair
      </Button>
    </Container>
  );
};

export { Dashboard };
