import { useState } from 'react';

const useStepper = (stepsNumber: number, initialStep = 1) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const goNext = () => {
    setCurrentStep(Math.min(currentStep + 1, stepsNumber));
  };

  const goPrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  return { currentStep, goNext, goPrevious, goToStep: setCurrentStep };
};

export default useStepper;
