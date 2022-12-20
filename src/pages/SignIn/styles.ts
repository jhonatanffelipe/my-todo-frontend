import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 800px;

  padding: 25px;

  form {
    margin: 80px 0 40px;
    width: 340px;
    text-align: center;

    > a {
      display: block;
      margin-top: 24px;
      color: #fff;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #f4ede8;
      }
    }
  }

  h1 {
    margin-bottom: 34px;
  }

  input {
    background: #fff;
    border-radius: 10px;
    border: 2px solid;
    padding: 16px;
    width: 100%;

    & + input {
      margin-top: 8px;
    }
  }

  button {
    background: #6c5dd2;
    border-radius: 10px;
    margin-top: 34px;
    padding: 16px;
    width: 100%;
    color: #fff;
    font-weight: 500;

    &:hover {
      background: #5e51b6;
      transition: background-color 0.2s;
    }
  }

  > a {
    display: flex;
    align-items: center;
    color: #6c5dd2;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #5e51b6;
    }

    svg {
      margin-right: 16px;
    }
  }

  @media (max-width: 1100px) {
    max-width: 100vw;
  }
`;

export const Background = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #6c5dd2;

  padding: 25px;

  @media (max-width: 1100px) {
    display: none;
    transition: display 1s;
  }
`;

export const LogoImg = styled.img`
  width: 340px;
`;

export const BackgroundImg = styled.img`
  width: 70%;
  min-width: 500px;
`;
