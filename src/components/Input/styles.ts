import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  border: 2px solid;
  padding: 16px;
  width: 100%;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
