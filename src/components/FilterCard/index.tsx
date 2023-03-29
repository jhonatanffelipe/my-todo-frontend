import React, { ButtonHTMLAttributes } from "react";
import { FiFilter } from "react-icons/fi";

import { Container, FilterCardBotton, FilterCardTop } from "./styles";

interface IFilterCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  selected: boolean;
}
const FilterCard: React.FC<IFilterCardProps> = ({ title, selected, ...rest }) => {
  return (
    <Container selected={selected} {...rest}>
      <FilterCardTop>
        <FiFilter size={20} />
      </FilterCardTop>
      <FilterCardBotton>
        <strong>{title}</strong>
      </FilterCardBotton>
    </Container>
  );
};

export { FilterCard };
