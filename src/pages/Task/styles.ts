import { shade } from "polished";
import styled, { css } from "styled-components";

interface ICheckboxProps {
  selected: boolean;
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  background: #282b30;
`;

export const Content = styled.div`
  @media (min-width: 700px) {
    width: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    width: 100%;
    margin: 36px;

    .conclued-delete {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 18px;
      padding: 1px;
      cursor: pointer;

      button {
        background: transparent;
        border: none;
        color: #fff;

        &:hover {
          color: ${shade(0.2, "#fff")};
        }
      }
    }

    > button {
      width: 100%;
    }
  }
`;

export const Checkbox = styled.div<ICheckboxProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    color: #6c5dd2;
  }

  div {
    border: solid 2px #6c5dd2;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-right: 8px;

    svg {
      color: #fff;
    }

    ${props =>
      props.selected &&
      css`
        background-color: #6c5dd2;
      `}
  }
`;
