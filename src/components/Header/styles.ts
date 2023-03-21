import { shade } from "polished";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface IMenuItensProps {
  selected: boolean;
}

interface IContentMobileProps {
  menuOpen: boolean;
}

export const Container = styled.header<IContentMobileProps>`
  border-bottom: 2px solid #6c5dd2;
  background: #1e2128;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 850px) {
    height: 80px;
  }

  ${props =>
    props.menuOpen
      ? css`
          height: 200px;
          align-items: flex-start;
        `
      : css`
          height: 80px;
        `}
`;

export const ContentDesktop = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  position: relative;

  > img {
    width: 150px;
    margin-right: 45px;
  }

  @media (max-width: 850px) {
    display: none;
  }
`;

export const ProfileDesktop = styled.div`
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

export const MenuDesktop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  margin-right: 50px;
`;

export const MenuItemDesktop = styled(Link)<IMenuItensProps>`
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

export const PowerDesktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 15px;
  position: absolute;
  right: 0;

  svg {
    cursor: pointer;

    &:hover {
      color: #6c5dd2;
    }
  }
`;

export const ContentMobile = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;

  @media (min-width: 850px) {
    display: none;
  }
`;

export const ContentMobileHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    width: 120px;
  }

  > svg {
    cursor: pointer;
    color: #fff;

    &:hover {
      color: ${shade(0.2, "#6c5dd2")};
    }
  }
`;

export const MenuMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItemMobile = styled(Link)<IMenuItensProps>`
  margin-bottom: 16px;
  font-size: 16px;
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

export const PowerMobile = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  svg {
    cursor: pointer;

    &:hover {
      color: #6c5dd2;
    }
  }
`;
