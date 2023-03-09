import styled, { css } from "styled-components";

import { Tooltip } from "../Tooltip";

interface IContanerProps {
  isFocused: boolean;
  isField: boolean;
  isError: boolean;
}

export const Container = styled.div<IContanerProps>`
  display: flex;
  align-items: center;
  background: #282b30;
  border-radius: 10px;
  border: 2px solid #282b30;
  padding: 16px;
  width: 100%;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #6c5dd2;
      border-color: #6c5dd2;
    `}

  ${props =>
    props.isField &&
    css`
      color: #6c5dd2;
    `}

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: #fff;
    transition: background-color 5000s ease-in-out 0s;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
