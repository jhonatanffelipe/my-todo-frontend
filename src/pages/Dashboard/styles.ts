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
`;

export const FilterCard = styled.div`
  background: #1e2128;

  height: 70px;
  min-width: 250px;
  margin: 4px 8px;
  border-radius: 8px;
`;
