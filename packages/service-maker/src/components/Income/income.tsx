import type { IncomeInterface } from "./income.interface";

import {
  ContainerCenteredTitle,
  ContainerIncome,
  SubTitle,
  Title,
} from "./income.style";

export function IncomeComponent({ title }: IncomeInterface): React.ReactNode {
  return (
    <ContainerIncome>
      <Title>{title}</Title>
      <ContainerCenteredTitle>
        <SubTitle>499,244 $</SubTitle>
      </ContainerCenteredTitle>
    </ContainerIncome>
  );
}
