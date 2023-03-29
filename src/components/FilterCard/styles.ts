import { shade } from "polished";
import styled, { css } from "styled-components";

interface IContainerProps {
  selected: boolean;
}

export const Container = styled.button<IContainerProps>`
  background: #1e2128;
  color: #fff;

  height: 80px;
  min-width: 250px;
  margin: 4px 8px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  padding: 8px 16px;

  border: none;

  cursor: pointer;

  transition: background 0.3s;

  &:hover {
    background: ${shade(0.2, "#1e2128")};
  }

  ${props =>
    props.selected &&
    css`
      background: #6c5dd2;

      &:hover {
        background: ${shade(0.2, "#6c5dd2")};
      }
    `}
`;

export const FilterCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  width: 100%;
`;

export const FilterCardBotton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  width: 100%;
`;
