// @ts-ignore
import TRESOR from 'assets/icons/tresor.png';
import { ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import BadgeListItem from 'src/components/BadgeListItem/BadgeListItem';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';
import { useGetUserUnlockedBadgesQuery } from 'src/services/badge/badge';
import type { BadgeModel } from 'src/services/badge/badge.dto';

function BadgeDashboard() {
  const { data: badgeData, isFetching: isUnlockedBadgesFetchin } = useGetUserUnlockedBadgesQuery();

  const badges = useMemo<BadgeModel[]>(() => {
    if (!badgeData) return [];
    return badgeData.badges;
  }, [badgeData]);

  if (isUnlockedBadgesFetchin) return <Text>Loading...</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack w={'full'} space={'md'}>
        <SectionHeader
          title={'Badges'}
          description={"Explore your badge collection and learn how to unlock the ones you're missing."}
          icon={TRESOR}
          colorStyle={{ bg: '#FFE5CF', borderColor: '#E57E25', titleColor: '#E6674F', descriptionColor: '#DB8878' }}
        />
        <VStack w={'full'}>
          {badges.map((badge, index) => (
            <BadgeListItem badge={badge} index={index} key={badge.id} />
          ))}
          <BadgeListItem index={badges.length} key={'last-id'} />
        </VStack>
      </VStack>
    </ScrollView>
  );
}

export default BadgeDashboard;
