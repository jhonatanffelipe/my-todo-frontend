import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

export const FilterSession = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`;

export const Separator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 24px;

  div {
    width: 1045px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #fff;
    position: relative;

    span {
      position: absolute;
      background: #282b30;
      padding: 0 16px;
    }

    @media (max-width: 1063px) {
      width: 785px;
    }

    @media (max-width: 797px) {
      width: 510px;
    }

    @media (max-width: 532px) {
      width: 250px;
    }
  }
`;

export const TaskSession = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`;

export const Task = styled.div`
  width: 250px;
  height: 150px;
  background: #6c5dd2;

  &:hover {
    background: ${shade(0.2, "#6c5dd2")};
  }

  cursor: pointer;

  border-radius: 8px;
  margin: 4px 8px;
`;

export const TaskTop = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 16px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    background: #1e2128;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    img {
      width: 35px;
      height: 35px;
    }
  }

  strong {
    font-size: 18px;
  }
`;

export const TaskBotton = styled.div`
  display: flex;

  width: 100%;
  height: 48px;

  justify-content: space-between;
  align-items: flex-end;
  padding: 8px;

  span + span {
    color: #1e2128;
  }
`;
