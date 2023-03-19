import React, { useEffect, useState } from "react";

import { Container, Content, Menu, MenuItem, Power, Profile } from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import { FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [pathName, setPathName] = useState("");
  const { user, singOut } = useAuth();

  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <>
      {user && (
        <Container>
          <Content>
            <img src={logoImg} alt="My Todo" />

            <Profile>
              <img src="https://avatars.githubusercontent.com/u/54486596?v=4" alt="Jhonatan Nascimento" />

              <div>
                <p>Bem vindo,</p>
                <strong>Jhonatan Nascimento</strong>
              </div>
            </Profile>

            <Menu>
              <MenuItem to={"/"} selected={pathName === "/dashboard"}>
                Inicio
              </MenuItem>
              <MenuItem to={"/task"} selected={pathName === "/task"}>
                Nova Tarefa
              </MenuItem>
              <MenuItem to={"/profile"} selected={pathName === "/profile"}>
                Meu Perfil
              </MenuItem>
            </Menu>

            <Power>
              <FiPower size={20} onClick={singOut} />
            </Power>
          </Content>
        </Container>
      )}
    </>
  );
};

export { Header };
