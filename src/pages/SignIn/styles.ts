import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  background: #282b30;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    max-width: 100vw;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 800px;

  padding: 25px;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 56px 0 40px;
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
  width: 300px;
`;

export const BackgroundImg = styled.img`
  width: 70%;
  min-width: 500px;
`;
