import { shade } from "polished";
import styled, { css } from "styled-components";

interface IContanerProps {
  disabled: boolean;
  size?: number;
}

export const Container = styled.button<IContanerProps>`
  background: #6c5dd2;
  border-radius: 10px;
  border: 0;
  padding: 16px;
  color: #fff;
  font-weight: bold;

  margin-top: 16px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#6c5dd2")};
  }
  width: 300px;

  ${props =>
    props.size &&
    props.size > 0 &&
    css`
      width: ${props.size}px;
    `}

  ${props =>
    props.disabled &&
    css`
      background-color: #5d5d5d;

      &:hover {
        background: ${shade(0.2, "#5D5D5D")};
      }
    `}
`;
