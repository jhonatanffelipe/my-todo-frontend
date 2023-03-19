import { shade } from "polished";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface IMenuItensProps {
  selected: boolean;
}

export const Container = styled.header`
  height: 80px;
  border-bottom: 2px solid #6c5dd2;
  background: #1e2128;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  position: relative;

  > img {
    width: 150px;
    margin-right: 70px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    border: 2px solid #6c5dd2;
  }

  div {
    margin-left: 15px;
    font-size: 12px;

    p {
      margin-bottom: 3px;
    }

    strong {
      color: #6c5dd2;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const MenuItem = styled(Link)<IMenuItensProps>`
  margin-left: 8px;
  margin-right: 8px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;

  ${props =>
    props.selected
      ? css`
          color: #6c5dd2;

          &:hover {
            color: ${shade(0.2, "#6c5dd2")};
          }
        `
      : css`
          color: #fff;

          &:hover {
            color: ${shade(0.2, "#fff")};
          }
        `}
`;

export const Power = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 15px;

  svg {
    cursor: pointer;

    &:hover {
      color: #6c5dd2;
    }
  }
`;
