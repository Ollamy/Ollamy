import { useCallback, useState } from 'react';
import { CurrentPlan } from 'pages/Home/Subscription/Body/CurrentPlan/CurrentPlan';
import styled from 'styled-components';

import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

export type PlanNameType = 'Basic' | 'Regular' | 'Premium';

export interface PlansType {
  title: PlanNameType;
  price: string;
  descriptions: string[];
  color: string;
}

export function SubscriptionBody() {
  const plans: PlansType[] = [
    {
      title: 'Basic',
      price: '$0',
      descriptions: [
        'Up to 5 students per course',
        'Up to 3 courses',
        'Basic chat and analytics',
      ],
      color: '#36630D',
    },
    {
      title: 'Regular',
      price: '$19.99',
      descriptions: [
        'All the features from the Basic plan',
        'Up to 10 courses',
        'Up to 100 students per course',
      ],
      color: '#267186',
    },
    {
      title: 'Premium',
      price: '$29.99',
      descriptions: [
        'All the features from the Regular plan',
        'Unlimited courses',
        'Unlimited students',
      ],
      color: '#341B98',
    },
  ];

  const [currentPlan, setCurrentPlan] = useState<PlanNameType>('Basic');

  const handleSelectPlan = useCallback((target: PlanNameType) => {
    setCurrentPlan(target);
  }, []);

  return (
    <Container>
      <CurrentPlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
      <SubContainer>
        {plans.map(({ title, price, descriptions, color }) => {
          const isSelected = currentPlan === title;
          return (
            <PlanContainer key={title} style={{ borderColor: color }}>
              <BodyContainer>
                <Title style={{ color }}>{title}</Title>
                <Price>{price}</Price>
                {descriptions.map((description) => (
                  <DescriptionRow key={description}>
                    <CheckIcon />
                    <Description>{description}</Description>
                  </DescriptionRow>
                ))}
              </BodyContainer>
              <FooterContainer>
                <Button
                  onClick={() => handleSelectPlan(title)}
                  disabled={currentPlan === title}
                  variant={'ghost'}
                  style={{ color: isSelected ? 'gray' : color }}
                >
                  {isSelected ? 'Current plan' : 'Select plan'}
                  {!isSelected && <ArrowRightIcon />}
                </Button>
              </FooterContainer>
            </PlanContainer>
          );
        })}
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 60px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
`;

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 340px;
  height: 515px;
  border-radius: 8px;
  border: 1px solid #3d3d3d;
  background: white;

  padding: 24px;
`;

const BodyContainer = styled.div``;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

const Price = styled.h2`
  margin-bottom: 60px;
`;

const DescriptionRow = styled.div`
  display: flex;
  align-items: center;

  gap: 16px;
  margin-bottom: 12px;
`;

const Description = styled.p`
  margin: 0;
`;
