import { Box } from 'native-base';
import { Path, Svg } from 'react-native-svg';
import { BadgeStatus } from 'src/pages/badge/types';
import { Status } from 'src/pages/courses/types';

interface VerticalProgressBarProps {
  status: Status | BadgeStatus;
  index: number;
}

export const STATUS_COLORS: Record<Status | BadgeStatus, string> = {
  [Status.NOT_STARTED]: '#BDBDBD',
  [Status.IN_PROGRESS]: '#F5B75D',
  [Status.COMPLETED]: '#876BF6',
  [BadgeStatus.UNLOCKED]: '#79CE87',
  [BadgeStatus.LOCKED]: '#BDBDBD',
};

function VerticalProgressBar({ status, index }: VerticalProgressBarProps) {
  return (
    <Box style={{ transform: index % 2 ? 'rotate(180deg)' : undefined }} w={'20px'}>
      <Svg width={'11'} height={'102'} viewBox={'0 0 11 102'} fill={'none'}>
        <Path
          d={
            'M9.0544 101.325C9.23407 101.848 9.80309 102.125 10.3253 101.946C10.8476 101.766 11.1253 101.197 10.9456 100.675L9.0544 101.325ZM10.9456 100.675C4.28213 81.3065 1.67846 66.2193 2.03136 51.1251C2.38472 36.0113 5.70245 20.834 10.9657 1.25966L9.0343 0.740338C3.76506 20.337 0.391219 35.7098 0.0319063 51.0783C-0.327863 66.4664 2.33471 81.7938 9.0544 101.325L10.9456 100.675Z'
          }
          fill={STATUS_COLORS[status]}
        />
      </Svg>
    </Box>
  );
}

export default VerticalProgressBar;
