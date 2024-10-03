import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import type { PlanNameType } from 'pages/Home/Subscription/Body/SubscriptionBody';
import styled from 'styled-components';

import { Button } from '@radix-ui/themes';

interface CurrentPlanProps {
  currentPlan: PlanNameType;
  setCurrentPlan: Dispatch<SetStateAction<PlanNameType>>;
}

export function CurrentPlan({ currentPlan, setCurrentPlan }: CurrentPlanProps) {
  const handleCancelPlan = useCallback(() => {
    setCurrentPlan('Basic');
  }, [setCurrentPlan]);

  return (
    <Container>
      {`Your current plan is: "${currentPlan}"`}
      {currentPlan !== 'Basic' && (
        <Button onClick={handleCancelPlan} color={'red'}>
          Cancel
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px;

  width: 100%;
  height: 100px;

  background: white;
  border-radius: 4px;
  border: 1px solid #afaeae;
`;
