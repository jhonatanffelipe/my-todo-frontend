import React from "react";

import { Container, Menu, MenuItem, Profile } from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import { FiPower } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <Container>
      <img src={logoImg} alt="My Todo" />

      <Profile>
        <img src="https://avatars.githubusercontent.com/u/54486596?v=4" alt="Jhonatan Nascimento" />
        <p>Bem vindo,</p>
        <strong>Jhonatan Nascimento</strong>
      </Profile>

      <Menu>
        <MenuItem>Inicio</MenuItem>
        <MenuItem>Nova Tarefa</MenuItem>
        <MenuItem>Meu Perfil</MenuItem>
      </Menu>

      <FiPower size={20} />
    </Container>
  );
};

export { Header };
