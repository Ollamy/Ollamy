import { IncomeInterface } from 'components/Income/income.interface';
import {
  ContainerCenteredTitle,
  ContainerIncome,
  SubTitle,
  Title,
} from 'components/Income/income.style';

export function IncomeComponent({ title }: IncomeInterface) {
  return (
    <ContainerIncome>
      <Title>{title}</Title>
      <ContainerCenteredTitle>
        <SubTitle>499,244 $</SubTitle>
      </ContainerCenteredTitle>
    </ContainerIncome>
  );
}
