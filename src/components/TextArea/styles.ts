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
  background: #1e2128;
  border-radius: 10px;
  border: 2px solid #1e2128;
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

    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: #fff;
    transition: background-color 5000s ease-in-out 0s;
  }

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;

    height: 150px;

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
