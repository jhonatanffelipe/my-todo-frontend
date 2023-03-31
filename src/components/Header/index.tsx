import React, { useEffect, useState } from "react";

import {
  Container,
  ContentDesktop,
  ContentMobile,
  ContentMobileHeader,
  MenuDesktop,
  MenuItemDesktop,
  MenuItemMobile,
  MenuMobile,
  PowerDesktop,
  PowerMobile,
  ProfileDesktop,
} from "./styles";
import logoImg from "../../assets/logo-purple.svg";
import { FiAlignJustify, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [pathName, setPathName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, singOut } = useAuth();

  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <>
      {user && (
        <Container menuOpen={menuOpen}>
          <ContentDesktop>
            <img src={logoImg} alt="My Todo" />

            <ProfileDesktop>
              <img src={user.avatarUrl} alt={user.name} />

              <div>
                <p>Bem vindo,</p>
                <strong>{user.name}</strong>
              </div>
            </ProfileDesktop>

            <MenuDesktop>
              <MenuItemDesktop to={"/"} selected={pathName.includes("/dashboard")}>
                Inicio
              </MenuItemDesktop>
              <MenuItemDesktop to={"/task"} selected={pathName.includes("/task")}>
                Nova Tarefa
              </MenuItemDesktop>
              <MenuItemDesktop to={"/profile"} selected={pathName.includes("/profile")}>
                Meu Perfil
              </MenuItemDesktop>
            </MenuDesktop>

            <PowerDesktop>
              <FiPower size={20} onClick={singOut} />
            </PowerDesktop>
          </ContentDesktop>
          <ContentMobile>
            <ContentMobileHeader>
              <FiAlignJustify size={30} onClick={() => setMenuOpen(!menuOpen)} />
              <img src={logoImg} alt="My Todo" />
              <PowerMobile>
                <FiPower size={20} onClick={singOut} />
              </PowerMobile>
            </ContentMobileHeader>
            {menuOpen && (
              <MenuMobile>
                <MenuItemMobile to={"/"} selected={pathName === "/dashboard"}>
                  Inicio
                </MenuItemMobile>
                <MenuItemMobile to={"/task"} selected={pathName === "/task"}>
                  Nova Tarefa
                </MenuItemMobile>
                <MenuItemMobile to={"/profile"} selected={pathName === "/profile"}>
                  Meu Perfil
                </MenuItemMobile>
              </MenuMobile>
            )}
          </ContentMobile>
        </Container>
      )}
    </>
  );
};

export { Header };
