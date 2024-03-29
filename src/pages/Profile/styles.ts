import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  position: relative;
  padding-top: 25px;

  div {
    border-radius: 50%;
    border: solid 2px #6c5dd2;
    height: 150px;
    width: 150px;
    background: #282b30;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  label {
    border: none;
    background: #6c5dd2;
    color: #fff;
    padding: 10px;
    border-radius: 50%;

    position: absolute;
    bottom: 0;
    right: 0;

    cursor: pointer;

    &:hover {
      background: ${shade(0.2, "#6c5dd2")};
    }

    input {
      display: none;
    }
  }
`;

export const Form = styled.form`
  margin-top: 16px;
  margin-bottom: 56px;

  > div {
    margin-top: 18px;
  }
`;
